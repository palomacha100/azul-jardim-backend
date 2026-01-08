import { GameRepository } from "../ports/game-repository";
import { ScoreEntry } from "../../domain/score-entry";
import { ScoreReason } from "../../domain/score-reason";
import { Round } from "../../domain/round";
import { GameNotFoundError } from "../errors/game-not-found.error";

export class RegisterScore {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(params: {
    gameId: string;
    playerId: string;
    round: number;
    reason: ScoreReason;
    value: number;
  }): void {
    const game = this.gameRepository.findById(params.gameId);

    if (!game) {
      throw new GameNotFoundError(params.gameId);
    }

    const entry = new ScoreEntry({
      playerId: params.playerId,
      round: Round.create(params.round),
      reason: params.reason,
      value: params.value,
    });

    game.registerScore(entry);

    this.gameRepository.save(game);
  }
}
