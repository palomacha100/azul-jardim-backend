export class GameNotFoundError extends Error {
    constructor(gameId: string) {
        super("Game not found");
        this.name = "GameNotFoundError"
    }
}