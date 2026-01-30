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
        private readonly registerScoreUseCase: RegisterScore,
    ) {}

    /**
    * @openapi
    * /games:
    *   post:
    *     summary: Create a new game
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - gameId
    *             properties:
    *               gameId:
    *                 type: string
    *     responses:
    *       201:
    *         description: Game created
    */

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

    /**
    * @openapi
    * /games/{gameId}/players:
    *   post:
    *     summary: Add a player to a game
    *     parameters:
    *       - in: path
    *         name: gameId
    *         required: true
    *         schema:
    *           type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - playerId
    *               - playerName
    *             properties:
    *               playerId:
    *                 type: string
    *               playerName:
    *                 type: string
    *     responses:
    *       201:
    *         description: Player added
    */

    async addPlayer(req: Request, res: Response) {
        try {
            const result = this.addPlayerToGame.execute({
                gameId: req.params.gameId,
                playerId: req.body.playerId,
                playerName: req.body.playerName,
            });

            return res.status(201).json(result);
        } catch (error) {
            return handleHttpError(error, res);
        }
    }

    /**
    * @openapi
    * /games/{gameId}/start:
    *   post:
    *     summary: Start a game
    *     parameters:
    *       - in: path
    *         name: gameId
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       200:
    *         description: Game started
    */

    async start(req: Request, res: Response) {
        try {
            const result = this.startGame.execute({
               gameId: req.params.gameId,
            });

            return res.status(200).json(result);
        } catch (error) {
            return handleHttpError(error, res)
        }
    }

    /**
    * @openapi
    * /games/{gameId}/scores:
    *   post:
    *     summary: Register a score for a player
    *     parameters:
    *       - in: path
    *         name: gameId
    *         required: true
    *         schema:
    *           type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - playerId
    *               - round
    *               - reason
    *               - value
    *             properties:
    *               playerId:
    *                 type: string
    *               round:
    *                 type: integer
    *                 example: 1
    *               reason:
    *                 type: string
    *                 enum: [BONUS, PENALTY, FLOWER_GROUP]
    *               value:
    *                 type: integer
    *     responses:
    *       200:
    *         description: Score registered
    */


    async registerScore(req: Request, res: Response) {
        try {
            const result = this.registerScoreUseCase.execute({
                gameId: req.params.gameId,
                playerId: req.body.playerId,
                round: req.body.round,
                reason: req.body.reason,
                value: req.body.value,
            });

            return res.status(200).json(result);
        } catch (error) {
            return handleHttpError(error, res);
        }
    }
}