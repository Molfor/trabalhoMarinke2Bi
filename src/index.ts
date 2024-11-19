import express from "express";
import dotenv from "dotenv";
import sequelize from "./shared/connection";
import profileRoutes from "./routes/profile.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use("/profiles", profileRoutes);

// Conexão com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Conectado ao banco de dados!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((error) => console.error("Erro ao conectar no banco de dados:", error));
