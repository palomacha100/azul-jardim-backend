import { CreateGame } from "../use-cases/create-game";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";

describe("CreateGame", () => {
  it("creates and stores a new game", () => {
    const repository = new InMemoryGameRepository();
    const createGame = new CreateGame(repository);

    const result = createGame.execute({ gameId: "game-1" });

    expect(result).toEqual({
      gameId: 'game-1',
      status: 'CREATED'
    });

    const storedGame = repository.findById('game-1');
    expect(storedGame).not.toBeNull();
  });
});
