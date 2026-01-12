import { GameRepository } from "../ports/game-repository";
import { Player } from "../../domain/player";
import { GameNotFoundError } from "../errors/game-not-found.error";
import { AddPlayerToGameInput } from "../dtos/add-player-to-game.input";
import { AddPlayerToGameOutput } from "../dtos/add-player-to-game.output";

export class AddPlayerToGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(input: AddPlayerToGameInput): AddPlayerToGameOutput {
    const game = this.gameRepository.findById(input.gameId);

    if (!game) {
      throw new GameNotFoundError();
    }

    const player = new Player(input.playerId, input.playerName);

    game.addPlayer(player);

    return {
      gameId: game.id,
      playerId: player.id
    };
  }
}
