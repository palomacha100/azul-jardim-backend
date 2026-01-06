import { Game } from "../../domain/game";

export interface GameRepository {
  save(game: Game): void;
  findById(id: string): Game | undefined;
}
