"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_service_1 = __importDefault(require("../services/profile.service"));
class ProfileController {
    async importProfilesFromCSV(req, res) {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).json({ message: "Arquivo não enviado" });
                return;
            }
            const message = await profile_service_1.default.importProfilesFromCSV(file.path);
            res.status(200).json({ message });
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
exports.default = new ProfileController();
