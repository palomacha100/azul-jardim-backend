import { GameAlreadyStartedError } from "./errors/game-already-started.error";
import { Player } from "./player";
import { ScoreBoard } from "./score-board";
import { ScoreEntry } from "./score-entry";
import { GameNotInProgressError } from "./errors/game-not-in-progress.error";
import { PlayerNotInGameError } from "./errors/player-not-in-game.error";
import { CannotAddPlayersAfterGameStartError } from "./errors/cannot-add-players-after-game-start.error";
import { ScoreReason } from "./score-reason";
import { PlayerReserve } from "./player-reserve";

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
  private reserves: Map<string, PlayerReserve> = new Map();
  private jokers: Map<string, number> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  addPlayer(player: Player): void {
    if (this.status !== GameStatus.CREATED) {
      throw new CannotAddPlayersAfterGameStartError();
    }
    this.players.push(player);
    this.giveInitialScore(player.id);
    this.reserves.set(player.id, new PlayerReserve());
    this.jokers.set(player.id, 3);
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

  addPiecesToPlayer(playerId: string, color: string, amount: number): void {
    const reserve = this.reserves.get(playerId);
    if (!reserve) throw new Error("Player reserve not found");

    reserve.addPieces(color, amount);
  }

  placeHexagonon(playerId: string, color: string, requiredPieces: number): void {
    const reserve = this.reserves.get(playerId);
    if (!reserve) throw new Error("reserve not found");

    const realPieces = reserve.getPieces(color);
    const jokers = this.jokers.get(playerId) ?? 0;

    if (realPieces == 0) {
      throw new Error("Must have at least one real piece");
    }

    const missingPieces = requiredPieces - realPieces;

    if(missingPieces > 0 ) {
      if (jokers < missingPieces) {
        throw new Error("Not enough pieces or jokers");
      }
    
      this.jokers.set(playerId, jokers - missingPieces);
    }

    reserve.consumePieces(color, Math.min(realPieces, requiredPieces));
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

  getJokers(playerId: string): number {
    return this.jokers.get(playerId) ?? 0;
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
