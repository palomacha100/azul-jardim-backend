import { GameNotFoundError } from "../errors/game-not-found.error";
import { GameRepository } from "../ports/game-repository";

export class StartGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(params: { gameId: string }): void {
    const game = this.gameRepository.findById(params.gameId);

    if (!game) {
      throw new GameNotFoundError(params.gameId);
    }

    game.start();

    this.gameRepository.save(game);
  }
}
