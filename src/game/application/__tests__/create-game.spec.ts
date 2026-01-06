import { CreateGame } from "../use-cases/create-game";
import { InMemoryGameRepository } from "../infra/in-memory-game-repository";

describe("CreateGame", () => {
  it("creates and stores a new game", () => {
    const repository = new InMemoryGameRepository();
    const createGame = new CreateGame(repository);

    const game = createGame.execute("game-1");

    const storedGame = repository.findById("game-1");

    expect(game).toBe(storedGame);
  });
});
