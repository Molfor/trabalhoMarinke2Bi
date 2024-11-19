"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_repository_1 = __importDefault(require("../repositories/profile.repository"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
class ProfileService {
    async importProfilesFromCSV(filePath) {
        // Tipagem explícita
        const profiles = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                // Validação dos dados e conversão
                if (row.firstname &&
                    row.lastname &&
                    row.profession &&
                    row.balance &&
                    row.type) {
                    profiles.push({
                        firstname: row.firstname,
                        lastname: row.lastname,
                        profession: row.profession,
                        balance: parseFloat(row.balance),
                        type: row.type,
                    });
                }
            })
                .on("end", async () => {
                try {
                    // Chamada do repositório para criar em massa
                    await profile_repository_1.default.bulkCreateProfiles(profiles);
                    resolve("Perfis importados com sucesso!");
                }
                catch (error) {
                    reject(`Erro ao importar perfis: ${error}`);
                }
            })
                .on("error", (error) => {
                reject(`Erro ao processar o arquivo CSV: ${error.message}`);
            });
        });
    }
}
exports.default = new ProfileService();
