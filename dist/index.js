"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./shared/connection"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas
app.use("/profiles", profile_routes_1.default);
// Conexão com o banco de dados
connection_1.default
    .sync()
    .then(() => {
    console.log("Conectado ao banco de dados!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
})
    .catch((error) => console.error("Erro ao conectar no banco de dados:", error));
