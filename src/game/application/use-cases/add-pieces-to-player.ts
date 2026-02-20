import { AddPiecesToPlayerInput } from "../dtos/add-pieces-to-player.input";
import { AddPiecesToPlayerOutput } from "../dtos/add-pieces-to-player.output";
import { GameNotFoundError } from "../errors/game-not-found.error";
import { GameRepository } from "../ports/game-repository";

export class AddPiecesToPlayer {
    constructor(private readonly gameRepository: GameRepository) {}

    execute(input: AddPiecesToPlayerInput): AddPiecesToPlayerOutput {
        const game = this.gameRepository.findById(input.gameId);

        if(!game) {
            throw new GameNotFoundError();
        }

        game.addPiecesToPlayer(input.playerId, input.color, input.amount);

        return {
            gameId: game.id,
            playerId: input.playerId,
            color: input.color,
            amount: input.amount,
            status: "PIECES_ADDED",
        }
    }
}