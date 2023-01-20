import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

export class ImportCategoryController {
  private importCategoryUseCase;
  static handle: (req: Request, res: Response) => Response;

  async handle(req: Request, res: Response) {
    const { file } = req;

    if (!file) {
      throw new AppError(
        "The CSV file was not passed or isn't formatted correctly"
      );
    }

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);
    return res.status(201).send();
  }
}
