import fs from "fs";
import { parse as csvParse } from "csv-parse";

import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      const categories: IImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name: name.trim(),
            description: description.trim(),
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
