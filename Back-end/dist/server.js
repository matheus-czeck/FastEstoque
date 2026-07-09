"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./repositories/database");
const PORT = process.env.PORT || 3000;
async function iniciaServidor() {
    try {
        await database_1.prisma.$connect();
        app_1.default.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`Banco de dados conectado!`);
        });
    }
    catch (error) {
        console.error("Erro ao iniciar servidor: ", error);
        await database_1.prisma.$disconnect();
        process.exit(1);
    }
}
iniciaServidor();
