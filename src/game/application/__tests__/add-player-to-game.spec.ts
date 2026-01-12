import { AddPlayerToGame } from "../use-cases/add-player-to-game";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";
import { CreateGame } from "../use-cases/create-game";
import { GameNotFoundError } from "../errors/game-not-found.error";

describe("AddPlayerToGame", () => {
  it("adds a player to an existing game", () => {
    const repository = new InMemoryGameRepository();

    new CreateGame(repository).execute({ gameId: 'game-1'});

    const addPlayer = new AddPlayerToGame(repository)

    const result = addPlayer.execute({
      gameId: "game-1",
      playerId: "p1",
      playerName: "Ana",
    });

    expect(result).toEqual({
      gameId: 'game-1',
      playerId: 'p1'
    });
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
    }).toThrow(GameNotFoundError);
  });
});
