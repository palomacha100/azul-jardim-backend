import { ScoreBoard } from "../score-board";
import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";

describe("ScoreBoard", () => {
  it("calculates total score for a player", () => {
    const board = new ScoreBoard();

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: 1,
        reason: ScoreReason.BONUS,
        value: 3,
      }),
    );

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: 2,
        reason: ScoreReason.PENALTY,
        value: -1,
      }),
    );

    expect(board.getScoreForPlayer("p1")).toBe(2);
  });

  it("keeps scores separeted per player", () => {
    const board = new ScoreBoard();

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: 1,
        reason: ScoreReason.BONUS,
        value: 5,
      }),
    );

    board.addEntry(
      new ScoreEntry({
        playerId: "p2",
        round: 1,
        reason: ScoreReason.BONUS,
        value: 3,
      }),
    );

    expect(board.getScoreForPlayer("p1")).toBe(5);
    expect(board.getScoreForPlayer("p2")).toBe(3);
  });
});
