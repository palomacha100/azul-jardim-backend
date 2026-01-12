import { AddPlayerToGame } from "src/game/application/use-cases/add-player-to-game";
import { RegisterScore } from "src/game/application/use-cases/register-score";
import { StartGame } from "src/game/application/use-cases/start-game";
import { CreateGame } from "src/game/application/use-cases/create-game";
import { handleHttpError } from "../../../shared/http/error-mapper";
import { Request, Response } from 'express';

export class GameController {
    constructor(
        private readonly createGame: CreateGame,
        private readonly startGame: StartGame,
        private readonly addPlayerToGame: AddPlayerToGame,
        private readonly registerScore: RegisterScore,
    ) {}


    async create(req: Request, res: Response) {
        try {
            const result = this.createGame.execute({
                gameId: req.body.gameId,
            });

            return res.status(201).json(result);
        } catch (error) {
            return handleHttpError(error, res);
        }
    }
}