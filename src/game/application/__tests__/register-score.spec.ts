import { RegisterScore } from "../use-cases/register-score";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";
import { CreateGame } from "../use-cases/create-game";
import { AddPlayerToGame } from "../use-cases/add-player-to-game";
import { StartGame } from "../use-cases/start-game";
import { ScoreReason } from "../../domain/score-reason";

describe("RegisterScore", () => {
  it("registers a score for a player in a active game", () => {
    const repository = new InMemoryGameRepository();

    new CreateGame(repository).execute("game-1");

    new AddPlayerToGame(repository).execute({
      gameId: "game-1",
      playerId: "player-1",
      playerName: "Ana",
    });

    new StartGame(repository).execute({
      gameId: "game-1"
    });

    const registerScore = new RegisterScore(repository);

    registerScore.execute({
      gameId: "game-1",
      playerId: "player-1",
      round: 1,
      reason: ScoreReason.BONUS,
      value: 3,
    });

    const game = repository.findById("game-1");
    expect(game?.getScore("player-1")).toBe(3);
  });

  it("throws error if game does not exist", () => {
    const repository = new InMemoryGameRepository();
    const registerScore = new RegisterScore(repository);

    expect(() => {
      registerScore.execute({
        gameId: "non-existent",
        playerId: "player-1",
        round: 1,
        reason: ScoreReason.BONUS,
        value: 3,
      });
    }).toThrow("Game not found");
  });
});
