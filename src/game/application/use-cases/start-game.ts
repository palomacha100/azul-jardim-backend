import { GameNotFoundError } from "../errors/game-not-found.error";
import { GameRepository } from "../ports/game-repository";
import { StartGameInput } from "../dtos/start-game.input";
import { StartGameOutput } from "../dtos/start-game.output";

export class StartGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(input: StartGameInput): StartGameOutput {
    const game = this.gameRepository.findById(input.gameId);
    
    if (!game) { 
      throw new GameNotFoundError();
    }
    
    game.start();

    return {
      gameId: game.id,
      status: "IN_PROGRESS"
    }
  }
}
