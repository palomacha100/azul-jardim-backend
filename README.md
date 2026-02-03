# 🌿 Azul Jardim – Game API

API REST para gerenciamento do ciclo de um jogo, desenvolvida com **TypeScript**, **Express** e **Clean Architecture**, com domínio rico, regras bem encapsuladas e documentação OpenAPI (Swagger).

Este projeto foi construído com foco em **boas práticas de arquitetura**, separação de responsabilidades e clareza de regras de negócio.

---

## 🧠 Visão Geral

A API permite:

- Criar um jogo
- Adicionar jogadores
- Iniciar o jogo
- Registrar pontuações seguindo regras de domínio

Todo o fluxo é controlado pelo **domínio**, não pelo controller, garantindo consistência e evitando estados inválidos.

---

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, dividido em camadas bem definidas:

src/
├── game/
│ ├── domain/ # Entidades, Value Objects e regras de negócio
│ ├── application/ # Casos de uso e contratos (DTOs)
│ └── infra/ # Controllers HTTP e repositórios em memória
├── shared/
│ └── http/ # Error mapper e Swagger
├── app.ts # Configuração do Express e rotas
└── server.ts # Bootstrap do servidor

## 🔗 Endpoints Disponíveis

### Criar jogo

POST /games

```json
{
  "gameId": "game-1"
}
```

### Adicionar jogador

POST /games/{gameId}/players

```json
{
  "playerId": "p1",
  "playerName": "Ana"
}
```

### Iniciar jogo

POST /games/{gameId}/start

### Registrar pontuação

POST /games/{gameId}/scores

```json
{
  "playerId": "p1",
  "round": 1,
  "reason": "BONUS",
  "value": 3
}
```

### Documentação (Swagger)

A documentação interativa da API está disponível em:
http://localhost:3000/docs

## Como rodar o projeto
Pré-requisitos

Node.js (>= 18)

npm

### Instalação
npm install

### Rodar o servidor
npx ts-node src/server.ts

O servidor irá iniciar em:
http://localhost:3000

## Testes

O projeto possui testes unitários para:
Domínio (entidades, regras e Value Objects)
Casos de uso (application layer)
Os testes garantem que:
regras não sejam violadas
erros sejam lançados corretamente
o comportamento do domínio seja previsível
