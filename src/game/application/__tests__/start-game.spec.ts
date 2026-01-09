import { StartGame } from "../use-cases/start-game";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";
import { CreateGame } from "../use-cases/create-game";
import { AddPlayerToGame } from "../use-cases/add-player-to-game";
import { GameNotFoundError } from "../../application/errors/game-not-found.error"

describe("StartGame", () => {
  it("starts a game with players", () => {
    const repository = new InMemoryGameRepository();

    new CreateGame(repository).execute({gameId: "game-1" });

    new AddPlayerToGame(repository).execute({
      gameId: "game-1",
      playerId: "player-1",
      playerName: "Ana",
    });

    const startGame = new StartGame(repository);
    startGame.execute({
      gameId: "game-1"
    });

    const game = repository.findById("game-1");

    expect(game).toBeDefined();
  });

  it("throws error if game does not exist", () => {
    const repository = new InMemoryGameRepository();
    const startGame = new StartGame(repository);

    expect(() => {
      startGame.execute({
        gameId: "non-existent",
      });
    }).toThrow(GameNotFoundError);
  });
});
