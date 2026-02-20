import { InMemoryGameRepository } from "../infra/in-memory-game-repository"
import { AddPiecesToPlayer } from "../use-cases/add-pieces-to-player";
import { AddPlayerToGame } from "../use-cases/add-player-to-game";
import { CreateGame } from "../use-cases/create-game";
import { StartGame } from "../use-cases/start-game";

describe("AddPiecesToPlayer", () => {
    it('adds pieces to player reserve', () => {
        const repository = new InMemoryGameRepository();
    
        new CreateGame(repository).execute({gameId: 'game-1'});
        new AddPlayerToGame(repository).execute({
            playerId: 'p1',
            gameId: 'game-1',
            playerName: "Ana"
        });
        new StartGame(repository).execute({gameId: 'game-1'});
    
        const addPiecesToPlayer = new AddPiecesToPlayer(repository);
    
        const result = addPiecesToPlayer.execute({
            gameId: 'game-1',
            playerId: 'p1',
            color: 'red',
            amount: 3,
        });
    
        expect(result).toEqual({
            gameId: 'game-1',
            playerId: 'p1',
            color: 'red',
            amount: 3,
            status: 'PIECES_ADDED',
        });
    })
});