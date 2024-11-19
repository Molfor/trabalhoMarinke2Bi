import { Request, Response } from "express";
import ProfileService from "../services/profile.service";

class ProfileController {
  async importProfilesFromCSV(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "Arquivo não enviado" });
        return;
      }
      const message = await ProfileService.importProfilesFromCSV(file.path);
      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ProfileController();