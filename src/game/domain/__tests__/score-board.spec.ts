import { ScoreBoard } from "../score-board";
import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";
import { Round } from "../round"

describe("ScoreBoard", () => {
  it("calculates total score including multiple entries", () => {
    const board = new ScoreBoard();

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: Round.create(1),
        reason: ScoreReason.BONUS,
        value: 3,
      }),
    );

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: Round.create(2),
        reason: ScoreReason.PENALTY,
        value: -1,
      }),
    );

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        reason: ScoreReason.INITIAL_SCORING,
        value: 15,
      })
    )

    expect(board.getScoreForPlayer("p1")).toBe(17);
  });

  it("keeps scores separeted per player", () => {
    const board = new ScoreBoard();

    board.addEntry(
      new ScoreEntry({
        playerId: "p1",
        round: Round.create(1),
        reason: ScoreReason.BONUS,
        value: 5,
      }),
    );

    board.addEntry(
      new ScoreEntry({
        playerId: "p2",
        round: Round.create(1),
        reason: ScoreReason.BONUS,
        value: 3,
      }),
    );

    expect(board.getScoreForPlayer("p1")).toBe(5);
    expect(board.getScoreForPlayer("p2")).toBe(3);
  });
});
