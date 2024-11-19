import csvParser from "csv-parser";
import fs from "fs";
import Profile from "../models/profile.model"; // Certifique-se de ajustar o caminho do modelo

class ProfileService {
  async importProfilesFromCSV(filePath: string): Promise<string> {
    const results: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          results.push(row); // Adicionar cada linha do CSV ao array 'results'
        })
        .on("end", async () => {
          try {
            // Mapear os dados para o formato do modelo Profile
            const profiles = results.map((row) => ({
              firstname: row.firstname,
              lastname: row.lastname,
              profession: row.profession,
              balance: parseFloat(row.balance), // Garantir que balance seja numérico
              type: row.type,
            }));

            // Inserir os perfis no banco de dados
            await Profile.bulkCreate(profiles);

            resolve("Dados importados com sucesso!");
          } catch (error) {
            reject("Erro ao salvar os dados no banco de dados!");
          }
        })
        .on("error", (error) => {
          reject(`Erro ao ler o arquivo CSV: ${error}`);
        });
    });
  }
}

export default new ProfileService();
