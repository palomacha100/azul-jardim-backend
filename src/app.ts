import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/http/swagger";
import { GameController } from "./game/infra/http/game.controller";
import { InMemoryGameRepository } from "./game/application/infra/in-memory-game-repository";
import { CreateGame } from "./game/application/use-cases/create-game";
import { StartGame } from "./game/application/use-cases/start-game";
import { AddPlayerToGame } from "./game/application/use-cases/add-player-to-game";
import { RegisterScore } from "./game/application/use-cases/register-score";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const gameRepository = new InMemoryGameRepository();

const createGame = new CreateGame(gameRepository);
const startGame = new StartGame(gameRepository);
const addPlayerToGame = new AddPlayerToGame(gameRepository);
const registerScore = new RegisterScore(gameRepository);

const gameController = new GameController(
  createGame,
  startGame,
  addPlayerToGame,
  registerScore,
);

app.post("/games", (req, res) => gameController.create(req, res));

app.post("/games/:gameId/players", (req, res) => gameController.addPlayer(req, res));

app.post("/games/:gameId/start", (req, res) =>
    gameController.start(req, res), 
);

app.post("/games/:gameId/scores", (req, res) =>
  gameController.registerScore(req, res),
)
export { app };
