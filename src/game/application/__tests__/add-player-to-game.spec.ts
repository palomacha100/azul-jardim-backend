import { AddPlayerToGame } from "../use-cases/add-player-to-game";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";
import { CreateGame } from "../use-cases/create-game";

describe("AddPlayerToGame", () => {
  it("adds a player to an existing game", () => {
    const repository = new InMemoryGameRepository();

    const createGame = new CreateGame(repository);
    createGame.execute("game-1");

    const addPlayer = new AddPlayerToGame(repository);
    addPlayer.execute({
      gameId: "game-1",
      playerId: "player-1",
      playerName: "Ana",
    });

    const game = repository.findById("game-1");

    expect(game).toBeDefined();
  });

  it("throws error if game does not exist", () => {
    const repository = new InMemoryGameRepository();
    const addPlayer = new AddPlayerToGame(repository);

    expect(() => {
      addPlayer.execute({
        gameId: "non-existent",
        playerId: "player-1",
        playerName: "Ana",
      });
    }).toThrow("Game not found");
  });
});
