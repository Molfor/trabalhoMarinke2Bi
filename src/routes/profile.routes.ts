import { Router } from "express";
import multer from "multer";
import ProfileController from "../controllers/profile.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/import", upload.single("file"), ProfileController.importProfilesFromCSV);

export default router;
