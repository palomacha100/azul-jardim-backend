import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { gameProviders } from './providers';

@Module({
    controllers: [GameController],
    providers: [...gameProviders],
})
export class GameModule {}