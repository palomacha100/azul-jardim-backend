import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AddPiecesToPlayerDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    playerId: string;
}