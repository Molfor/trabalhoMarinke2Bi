"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    database: "bancoapi",
    username: "root",
    password: "123456",
    host: "localhost",
    port: 3306,
});
// Testar a conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    }
    catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
    }
}
testConnection();
exports.default = sequelize;
