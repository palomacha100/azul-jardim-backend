import { ApplicationError } from "./application-error";

export class GameNotFoundError extends ApplicationError {
    constructor(gameId: string) {
        super("Game not found");
    }
}