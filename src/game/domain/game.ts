import { GameAlreadyStartedError } from "./errors/game-already-started.error";
import { Player } from "./player";
import { ScoreBoard } from "./score-board";
import { ScoreEntry } from "./score-entry";
import { GameNotInProgressError } from "./errors/game-not-in-progress.error";
import { PlayerNotInGameError } from "./errors/player-not-in-game.error";

export enum GameStatus {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export class Game {
  readonly id: string;
  private status: GameStatus = GameStatus.CREATED;
  private readonly players: Player[] = [];
  private readonly scoreBoard = new ScoreBoard();

  constructor(id: string) {
    this.id = id;
  }

  addPlayer(player: Player): void {
    if (this.status !== GameStatus.CREATED) {
      throw new Error("Cannot add players after game start");
    }
    this.players.push(player);
  }

  start(): void {
    if (this.status !== GameStatus.CREATED) {
      throw new GameAlreadyStartedError();
    }
    if (this.players.length === 0) {
      throw new Error("Cannot start game without players");
    }
    this.status = GameStatus.IN_PROGRESS;
  }

  registerScore(entry: ScoreEntry): void {
    if (this.status !== GameStatus.IN_PROGRESS) {
      throw new GameNotInProgressError();
    }

    const playerExists = this.players.some((p) => p.id === entry.playerId);

    if (!playerExists) {
      throw new PlayerNotInGameError();
    }

    this.scoreBoard.addEntry(entry);
  }

  getScore(playerId: string): number {
    return this.scoreBoard.getScoreForPlayer(playerId);
  }
}
