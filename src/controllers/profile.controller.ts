import { Request, Response } from "express";
import ProfileService from "../services/profile.service";
import multer from "multer";
import fs from "fs";

// Configuração do multer para upload do arquivo CSV
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Diretório onde o arquivo será armazenado
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usar o nome original do arquivo
  }
});

const upload = multer({ storage });

class ProfileController {
  // Middleware para lidar com o upload de arquivos
  uploadCSV = upload.single('file'); // Campo "file" no formulário de envio

  // Função para importar perfis do CSV
  async importProfilesFromCSV(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "Arquivo não enviado" });
        return;
      }

      // Chamar o serviço para processar o arquivo
      const message = await ProfileService.importProfilesFromCSV(file.path);

      // Remover o arquivo após o processamento
      fs.unlinkSync(file.path);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar o arquivo CSV!" });
    }
  }
}

export default new ProfileController();
