import { GameRepository } from "../ports/game-repository";
import { ScoreEntry } from "../../domain/score-entry";
import { ScoreReason } from "../../domain/score-reason";
import { Round } from "../../domain/round";
import { GameNotFoundError } from "../errors/game-not-found.error";
import { RegisterScoreInput } from "../dtos/register-score.input";
import { RegisterScoreOutput } from "../dtos/register-score.output";

export class RegisterScore {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(input: RegisterScoreInput): RegisterScoreOutput {
    const game = this.gameRepository.findById(input.gameId);

    if (!game) {
      throw new GameNotFoundError();
    }

    const round = Round.create(input.round)

    const entry = new ScoreEntry({
      playerId: input.playerId,
      round,
      reason: input.reason,
      value: input.value,
    });

    game.registerScore(entry);

    const totalScore = game.getScore(input.playerId);

    return {
      gameId: game.id,
      playerId: input.playerId,
      totalScore,
    };
  }
}
