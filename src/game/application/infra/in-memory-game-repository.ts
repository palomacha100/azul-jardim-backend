import { Game } from "../../domain/game";
import { GameRepository } from "../ports/game-repository";

export class InMemoryGameRepository implements GameRepository {
  private readonly games = new Map<string, Game>();

  save(game: Game): void {
    this.games.set(game.id, game);
  }

  findById(id: string): Game | undefined {
    return this.games.get(id);
  }
}
