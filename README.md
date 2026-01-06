# Azul – Jardim da Rainha | Backend

This project is a backend application designed to support the game **Azul – Jardim da Rainha**, with an initial focus on game scoring and match management.

The goal of this project is not only to provide a functional API, but also to serve as a learning-oriented, production-minded backend architecture.  
Business rules are carefully modeled at the domain level, independent of frameworks, and validated through automated tests.

The system is built following a layered architecture approach, separating domain logic, application use cases, and infrastructure concerns to ensure clarity, testability, and long-term maintainability.


## Application Use Cases (MVP)

This backend supports the following application use cases:

- CreateGame  
  Creates a new game instance in CREATED state.

- AddPlayerToGame  
  Adds a player to an existing game before it starts.

- StartGame  
  Transitions a game from CREATED to IN_PROGRESS.

- RegisterScore  
  Registers a scoring event for a player during an active game.

- GetScoreBoard  
  Returns the current score for all players in a game.

All business rules are enforced at the domain level.

