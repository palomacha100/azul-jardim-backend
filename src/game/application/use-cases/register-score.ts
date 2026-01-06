import { GameRepository } from "../ports/game-repository";
import { ScoreEntry } from "../../domain/score-entry";
import { ScoreReason } from "../../domain/score-reason";

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
      throw new Error("Game not found");
    }

    const entry = new ScoreEntry({
      playerId: params.playerId,
      round: params.round,
      reason: params.reason,
      value: params.value,
    });

    game.registerScore(entry);

    this.gameRepository.save(game);
  }
}
