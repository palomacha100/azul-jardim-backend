import { Body, Controller,  Inject, Param, Post } from '@nestjs/common';
import { CREATE_GAME,
    ADD_PLAYER_TO_GAME,
    START_GAME,
    REGISTER_SCORE,
 } from './providers';
import { CreateGame } from '../../application/use-cases/create-game';
import { AddPlayerToGame } from '../../application/use-cases/add-player-to-game';
import { StartGame } from '../../application/use-cases/start-game';
import { RegisterScore } from '../../application/use-cases/register-score';
import { ScoreReason } from '../../domain/score-reason';

@Controller('games')
export class GameController {
    constructor(
        @Inject(CREATE_GAME)
        private readonly createGame: CreateGame,

        @Inject(ADD_PLAYER_TO_GAME)
        private readonly addPlayer: AddPlayerToGame,

        @Inject(START_GAME)
        private readonly startGame: StartGame,

        @Inject(REGISTER_SCORE)
        private readonly registerScore: RegisterScore,
    ) {}

    @Post()
    create(@Body() body: { gameId: string }) {
        return this.createGame.execute(body.gameId);
    }

    @Post(':id/players')
    addPlayerToGame(
        @Param('id') gameId: string,
        @Body() body: { playerId: string; playerName: string},
    ) {
        this.addPlayer.execute({ gameId, ...body });
        return { status: 'ok' };
    }

    @Post(':id/start')
    start(@Param('id') gameId: string) {
        this.startGame.execute(gameId);
        return { status: 'ok' };
    }

    @Post(':id/scores')
    registerScoreToGame(
        @Param('id') gameId: string,
        @Body()
        body: {
            playerId: string;
            round: number;
            reason: ScoreReason;
            value: number;
        },
    ) {
        this.registerScore.execute({ gameId, ...body });
        return { status: 'ok' };
    }
}