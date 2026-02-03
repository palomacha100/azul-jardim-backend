import { ScoreEntry } from "./score-entry";
import { ScoreReason } from "./score-reason";

export class ScoreBoard {
  private readonly entries: ScoreEntry[] = [];

  addEntry(entry: ScoreEntry): void {
    this.entries.push(entry);
  }

  getScoreForPlayer(playerId: string): number {
    return this.entries
      .filter((e) => e.playerId === playerId)
      .reduce((sum, e) => sum + e.value, 0);
  }

  hasInitialScore(playerId: string): boolean {
    return this.entries.some(
      e =>
        e.playerId === playerId &&
        e.reason === ScoreReason.INITIAL_SCORING
    );
  }
}
