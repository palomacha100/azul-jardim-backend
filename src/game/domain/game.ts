import { GameAlreadyStartedError } from "./errors/game-already-started.error";
import { Player } from "./player";
import { ScoreBoard } from "./score-board";
import { ScoreEntry } from "./score-entry";
import { GameNotInProgressError } from "./errors/game-not-in-progress.error";
import { PlayerNotInGameError } from "./errors/player-not-in-game.error";
import { CannotAddPlayersAfterGameStartError } from "./errors/cannot-add-players-after-game-start.error";
import { Round } from "./round";
import { ScoreReason } from "./score-reason";

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
      throw new CannotAddPlayersAfterGameStartError();
    }
    this.players.push(player);
    this.giveInitialScore(player.id);
  }

    private giveInitialScore(playerId: string): void {
      if (this.scoreBoard.hasInitialScore(playerId)) {
        return
      }

      this.scoreBoard.addEntry (
        new ScoreEntry({
          playerId,
          reason: ScoreReason.INITIAL_SCORING,
          value: 15
        })
      )
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
