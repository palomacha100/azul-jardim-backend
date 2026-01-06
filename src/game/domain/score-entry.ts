import { ScoreReason } from "./score-reason";
import { ScoringRules } from "./scoring-rules";

export class ScoreEntry {
  readonly playerId: string;
  readonly round: number;
  readonly reason: ScoreReason;
  readonly value: number;
  readonly createdAt: Date;

  constructor(params: {
    playerId: string;
    round: number;
    reason: ScoreReason;
    value: number;
  }) {
    ScoringRules.validate(params.reason, params.value);

    this.playerId = params.playerId;
    this.round = params.round;
    this.reason = params.reason;
    this.value = params.value;
    this.createdAt = new Date();
  }
}
