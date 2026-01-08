import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";
import { Round } from "../../domain/round";

describe("ScoryEntry", () => {
  it("creates a valid score entry for FLOWER_GROUP", () => {
    const entry = new ScoreEntry({
      playerId: "p1",
      round: Round.create(1),
      reason: ScoreReason.FLOWER_GROUP,
      value: 5,
    });

    expect(entry.value).toBe(5);
  });

  it("trows error for invalid PENALTY score", () => {
    expect(() => {
      new ScoreEntry({
        playerId: "p1",
        round: Round.create(1),
        reason: ScoreReason.PENALTY,
        value: 3,
      });
    }).toThrow();
  });
});
