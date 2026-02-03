import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";
import { Round } from "../../domain/round";
import { InvalidScoreValueError } from "../errors/invalid-score-value.error";

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
    }).toThrow(InvalidScoreValueError);
  });

  it("creates a valid INITIAL_SCORE entry with value 15", () => {
  const entry = new ScoreEntry({
    playerId: "p1",
    reason: ScoreReason.INITIAL_SCORING,
    value: 15,
  });

  expect(entry.value).toBe(15);
});

it("throws error if INITIAL_SCORE is not 15", () => {
  expect(() => {
    new ScoreEntry({
      playerId: "p1",
      reason: ScoreReason.INITIAL_SCORING,
      value: 10,
    });
  }).toThrow();
});

});
