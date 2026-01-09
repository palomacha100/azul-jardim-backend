import { ApplicationError } from "./application-error";

export class GameNotFoundError extends ApplicationError {
    constructor() {
        super("Game not found");
    }
}