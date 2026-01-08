import { IsEnum, IsInt, IsString } from 'class-validator';
import { ScoreReason } from '../../../domain/score-reason';

export class RegisterScoreDto {
    @IsString()
    playerId: string;

    @IsInt()
    round: number;

    @IsEnum(ScoreReason)
    reason: ScoreReason;

    @IsInt()
    value: number;
}