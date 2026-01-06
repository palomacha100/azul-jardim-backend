import { ScoreEntry } from "./score-entry";

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
}
