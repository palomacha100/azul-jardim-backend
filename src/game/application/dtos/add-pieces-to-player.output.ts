export interface AddPiecesToPlayerOutput {
    gameId: string;
    playerId: string;
    color: string;
    amount: number;
    status: "PIECES_ADDED";
}