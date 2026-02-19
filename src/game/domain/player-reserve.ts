export class PlayerReserve {
    private pieces: Map<string, number> = new Map();

    addPieces(color: string, amount: number): void {
        const current = this.pieces.get(color) ?? 0;
        this.pieces.set(color, current + amount);
    }

    getPieces(color: string): number {
        return this.pieces.get(color) ?? 0;
    }

    consumePieces(color: string, amount: number): void {
        const current = this.getPieces(color)

        if (current < amount) {
            throw new Error("Not enough pieces");
        }

        this.pieces.set(color, current - amount);
    }
}