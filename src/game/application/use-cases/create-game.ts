import { Game } from "../../domain/game";
import { GameRepository } from "../ports/game-repository";
import { CreateGameInput } from "../dtos/create-game.input";
import { CreateGameOutput } from "../dtos/create-game.output";

export class CreateGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(input: CreateGameInput): CreateGameOutput {
    const game = new Game(input.gameId);

    this.gameRepository.save(game);

    return {
      gameId: game.id,
      status: 'CREATED',
    };
  }
}
