import { GameRepository } from "../ports/game-repository";
import { Player } from "../../domain/player";

export class AddPlayerToGame {
  constructor(private readonly gameRepository: GameRepository) {}

  execute(params: {
    gameId: string;
    playerId: string;
    playerName: string;
  }): void {
    const game = this.gameRepository.findById(params.gameId);

    if (!game) {
      throw new Error("Game not found");
    }

    const player = new Player(params.playerId, params.playerName);

    game.addPlayer(player);

    this.gameRepository.save(game);
  }
}
