export class Round {
  private constructor(readonly value: number) {}

  static create(value: number): Round {
    if (!Number.isInteger(value)) {
      throw new Error("Round must be an integer");
    }

    if (value < 1) {
      throw new Error("Round must be greater than or equal to 1");
    }

    return new Round(value);
  }
}
