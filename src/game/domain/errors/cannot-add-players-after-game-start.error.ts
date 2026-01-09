import { DomainError } from "./domain-error"

export class CannotAddPlayersAfterGameStartError extends DomainError {
    constructor() {
        super("Cannot add players after game start")
    }
}