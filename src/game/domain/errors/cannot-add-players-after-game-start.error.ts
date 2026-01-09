export class CannotAddPlayersAfterGameStartError extends Error {
    constructor() {
        super("Cannot add players after game start")
        this.name = "CannotAddPlayersAfterGameStartError"
    }
}