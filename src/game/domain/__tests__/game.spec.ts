import { Game } from "../game";
import { Player } from "../player";
import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";

describe("Game", () => {
  it("does not allow scoring before game starts", () => {
    const game = new Game("g1");
    const player = new Player("p1", "Ana");

    game.addPlayer(player);

    expect(() => {
      game.registerScore(
        new ScoreEntry({
          playerId: "p1",
          round: 1,
          reason: ScoreReason.BONUS,
          value: 3,
        }),
      );
    }).toThrow();
  });

  it("allows scoring after game starts", () => {
    const game = new Game("g1");
    const player = new Player("p1", "Ana");

    game.addPlayer(player);
    game.start();

    game.registerScore(
      new ScoreEntry({
        playerId: "p1",
        round: 1,
        reason: ScoreReason.BONUS,
        value: 3,
      }),
    );

    expect(game.getScore("p1")).toBe(3);
  });

  it("does not allow scoring for player not in game", () => {
    const game = new Game("g1");
    const player = new Player("p1", "Ana");

    game.addPlayer(player);
    game.start();

    expect(() => {
      game.registerScore(
        new ScoreEntry({
          playerId: "p2",
          round: 1,
          reason: ScoreReason.BONUS,
          value: 3,
        }),
      );
    }).toThrow();
  });
});
