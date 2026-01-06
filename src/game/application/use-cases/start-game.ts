import { GameRepository } from "../ports/game-repository";

export class StartGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(gameId: string): void {
    const game = this.gameRepository.findById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    game.start();

    this.gameRepository.save(game);
  }
}
