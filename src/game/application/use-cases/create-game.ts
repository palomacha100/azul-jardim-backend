import { Game } from "../../domain/game";
import { GameRepository } from "../ports/game-repository";

export class CreateGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(gameId: string): Game {
    const game = new Game(gameId);

    this.gameRepository.save(game);

    return game;
  }
}
