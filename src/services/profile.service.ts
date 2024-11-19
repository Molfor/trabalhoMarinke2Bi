import fs from "fs";
import csvParser from "csv-parser";
import Profile from "../models/profile.model";

class ProfileService {
  async importProfilesFromCSV(filePath: string): Promise<string> {
    const profiles: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          console.log("Linha lida do CSV:", row); // Log da linha lida

          const { firstname, lastname, profession, balance, type } = row;

          if (
            firstname &&
            lastname &&
            profession &&
            type &&
            !isNaN(parseFloat(balance)) // Verifica se o balance é numérico
          ) {
            profiles.push({
              firstname,
              lastname,
              profession,
              balance: parseFloat(balance), // Garante que seja um número
              type,
            });
          } else {
            console.warn("Dados inválidos encontrados na linha:", row); // Log para dados inválidos
          }
        })
        .on("end", async () => {
          console.log("Perfis prontos para inserção:", profiles); // Log dos perfis que serão inseridos

          try {
            if (profiles.length === 0) {
              reject("Nenhum dado válido encontrado no arquivo CSV.");
              return;
            }

            await Profile.bulkCreate(profiles);
            resolve("Perfis importados com sucesso!");
          } catch (error) {
            console.error("Erro ao inserir no banco:", error); // Log de erro do banco de dados
            reject("Erro ao inserir dados no banco de dados: " + error);
          } finally {
            fs.unlinkSync(filePath);
          }
        })
        .on("error", (error) => {
          console.error("Erro ao processar o arquivo CSV:", error); // Log de erro no processamento do CSV
          reject("Erro ao processar o arquivo CSV: " + error);
        });
    });
  }
}

export default new ProfileService();
