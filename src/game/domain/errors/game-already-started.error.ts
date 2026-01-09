import { DomainError } from "./domain-error"

export class GameAlreadyStartedError extends DomainError {
    constructor () {
        super('Game has already started');
    }
}