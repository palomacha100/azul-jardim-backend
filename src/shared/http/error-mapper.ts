import { Response } from "express";
import { DomainError } from "../../game/domain/errors/domain-error";
import { ApplicationError } from "../../game/application/errors/application-error";
import { GameNotFoundError } from "../../game/application/errors/game-not-found.error";

export function handleHttpError(error: unknown, res: Response) {
  if (error instanceof GameNotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof DomainError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof ApplicationError) {
    return res.status(422).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error" });
}
