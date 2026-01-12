import { ScoreReason } from "src/game/domain/score-reason";

export interface RegisterScoreInput {
  gameId: string;
  playerId: string;
  round: number;
  reason: ScoreReason;
  value: number;
}