export class GameAlreadyStartedError extends Error {
    constructor () {
        super('Game has already started');
        this.name = 'GameAlreadyStartError';
    }
}