export class GameNotInProgressError extends Error {
    constructor() {
        super('Game is not in progress');
        this.name = "GameNotInProgressError";
    }
}