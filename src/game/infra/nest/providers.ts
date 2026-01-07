import { InMemoryGameRepository } from "../../application/infra/in-memory-game-repository";
import { CreateGame } from "../../application/use-cases/create-game";
import { AddPlayerToGame } from "../../application/use-cases/add-player-to-game";
import { StartGame } from "../../application/use-cases/start-game";
import { RegisterScore } from "../../application/use-cases/register-score";
import { GameRepository } from "../../application/ports/game-repository";

export const GAME_REPOSITORY = 'GAME_REPOSITORY';
export const CREATE_GAME = 'CREATE_GAME';
export const ADD_PLAYER_TO_GAME = 'ADD_PLAYER_TO_GAME';
export const START_GAME = 'START_GAME';
export const REGISTER_SCORE = 'REGISTER_SCORE';

export const gameProviders =[
    {
        provide: GAME_REPOSITORY,
        useClass: InMemoryGameRepository,
    },
    {
        provide: CREATE_GAME,
        useFactory: (repo: GameRepository) => new CreateGame(repo),
        inject: [GAME_REPOSITORY],
    },
    {
        provide: ADD_PLAYER_TO_GAME,
        useFactory: (repo: GameRepository) => new AddPlayerToGame(repo),
        inject: [GAME_REPOSITORY],
    },
    {
        provide: START_GAME,
        useFactory: (repo: GameRepository) => new StartGame(repo),
        inject: [GAME_REPOSITORY],
    },
    {
        provide: REGISTER_SCORE,
        useFactory: (repo: GameRepository) => new RegisterScore(repo),
        inject: [GAME_REPOSITORY],
    },
];
