import { GameRepository } from "../ports/game-repository";
import { Player } from "../../domain/player";
import { GameNotFoundError } from "../errors/game-not-found.error";

export class AddPlayerToGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(params: {
    gameId: string;
    playerId: string;
    playerName: string;
  }): void {
    const game = this.gameRepository.findById(params.gameId);

    if (!game) {
      throw new GameNotFoundError(params.gameId);
    }

    const player = new Player(params.playerId, params.playerName);

    game.addPlayer(player);

    this.gameRepository.save(game);
  }
}
