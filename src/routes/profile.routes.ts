import express from 'express';
import ProfileController from '../controllers/profile.controller';
import multer from 'multer';

// Configuração do multer
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Rota para importar o CSV
router.post('/import', upload.single('file'), ProfileController.importProfilesFromCSV);

export default router;
