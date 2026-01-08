import { IsString, IsNotEmpty } from 'class-validator';

export class AddPlayerDto {
    @IsString()
    @IsNotEmpty()
    playerId: string;

    @IsString()
    @IsNotEmpty()
    playerName: string;
}