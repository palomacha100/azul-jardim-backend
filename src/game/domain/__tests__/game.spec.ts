import { GameAlreadyStartedError } from "../errors/game-already-started.error";
import { Game } from "../game";
import { Player } from "../player";
import { ScoreEntry } from "../score-entry";
import { ScoreReason } from "../score-reason";
import { Round } from "../round"
import { GameNotInProgressError } from "../errors/game-not-in-progress.error";
import { PlayerNotInGameError } from "../errors/player-not-in-game.error";
import { CannotAddPlayersAfterGameStartError } from "../errors/cannot-add-players-after-game-start.error";

describe("Game", () => {
  it("does not allow scoring before game starts", () => {
    const game = new Game("g1");
    const player = new Player("p1", "Ana");

    game.addPlayer(player);

    expect(() => {
      game.registerScore(
        new ScoreEntry({
          playerId: "p1",
          round: Round.create(1),
          reason: ScoreReason.BONUS,
          value: 3,
        }),
      );
    }).toThrow(GameNotInProgressError);
  });

  it("allows scoring after game starts", () => {
    const game = new Game("g1");
    const player = new Player("p1", "Ana");

    game.addPlayer(player);
    game.start();

    game.registerScore(
      new ScoreEntry({
        playerId: "p1",
        round: Round.create(1),
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
          round: Round.create(1),
          reason: ScoreReason.BONUS,
          value: 3,
        }),
      );
    }).toThrow(PlayerNotInGameError);
  });

  it('throws error if game is started twice', () => {
    const game = new Game('game-1');
    game.addPlayer(new Player('p1', 'Ana'));

    game.start();

    expect(() => {
      game.start();
    }).toThrow(GameAlreadyStartedError);
  });

  it('does not allow adding players after game start', () => {
    const game = new Game('g1');
    game.addPlayer(new Player('p1', 'Ana'));
    game.start();

    expect(() => {
      game.addPlayer(new Player('p2', 'João'));
    }).toThrow(CannotAddPlayersAfterGameStartError);
  });
});
