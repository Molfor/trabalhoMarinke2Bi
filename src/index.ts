import express from "express";
import profileRoutes from "./routes/profile.routes";

const app = express();
const port = 3000;

// Configurar o middleware para JSON
app.use(express.json());

// Usar as rotas do Profile
app.use("/api/profiles", profileRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
