import { DomainError } from "./domain-error"

export class GameNotInProgressError extends DomainError {
    constructor() {
        super('Game is not in progress');
    }
}