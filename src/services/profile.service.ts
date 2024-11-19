import ProfileRepository from "../repositories/profile.repository";
import csv from "csv-parser";
import fs from "fs";
import { ProfileCreationAttributes } from "../models/profile.model";

class ProfileService {
  async importProfilesFromCSV(filePath: string): Promise<string> {
    // Tipagem explícita
    const profiles: ProfileCreationAttributes[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          // Validação dos dados e conversão
          if (
            row.firstname &&
            row.lastname &&
            row.profession &&
            row.balance &&
            row.type
          ) {
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
            await ProfileRepository.bulkCreateProfiles(profiles);
            resolve("Perfis importados com sucesso!");
          } catch (error) {
            reject(`Erro ao importar perfis: ${error}`);
          }
        })
        .on("error", (error) => {
          reject(`Erro ao processar o arquivo CSV: ${error.message}`);
        });
    });
  }
}

export default new ProfileService();
