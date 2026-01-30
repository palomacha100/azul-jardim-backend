import swaggerJdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Azul Jardim Game API",
            version: "1.0.0",
            description: "API para gerenciamento do jogo Azul Jardim da Rainha",
        },
    },
    apis: ["src/game/infra/http/*.ts"],
});