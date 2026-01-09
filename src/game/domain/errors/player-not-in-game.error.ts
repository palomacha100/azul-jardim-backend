export class PlayerNotInGameError extends Error {
    constructor() {
        super('Player does not belong to this game')
        this.name = "PlayerNotInGameError"
    }
}