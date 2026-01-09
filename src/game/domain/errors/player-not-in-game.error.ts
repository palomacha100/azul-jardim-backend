import { DomainError } from "./domain-error"

export class PlayerNotInGameError extends DomainError {
    constructor() {
        super('Player does not belong to this game')
    }
}