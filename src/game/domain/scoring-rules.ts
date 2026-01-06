import { ScoreReason } from "./score-reason";

export class ScoringRules {
  static validate(reason: ScoreReason, value: number): void {
    switch (reason) {
      case ScoreReason.FLOWER_GROUP:
        if (value < 1 || value > 10) {
          throw new Error("FLOWER_GROUP  must be between 1 and 10");
        }
        break;

      case ScoreReason.BONUS:
        if (value < 1 || value > 5) {
          throw new Error("BONUS must be between 1 and 5");
        }
        break;

      case ScoreReason.PENALTY:
        if (value > -1 || value < -5) {
          throw new Error("PENALTY must be between -1 and -5");
        }
        break;

      case ScoreReason.FINAL_SCORING:
        if (value < 0) {
          throw new Error("FINAL_SCORING must be >= 0");
        }
        break;

      default:
        throw new Error("Unknown score reason");
    }
  }
}
