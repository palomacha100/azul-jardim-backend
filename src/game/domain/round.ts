export class Round {
  readonly value: number;
  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number): Round {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("Round must be a positive integer");
    }

    return new Round(value);
  }
}
