export class InvalidScoreValueError extends Error {
    constructor() {
        super('Invalid score value for score reason');
        this.name = 'InvalidScoreValueError';
    }
}