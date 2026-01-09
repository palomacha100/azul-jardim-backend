import { DomainError } from "./domain-error"

export class InvalidScoreValueError extends DomainError {
    constructor() {
        super('Invalid score value for score reason');
    }
}