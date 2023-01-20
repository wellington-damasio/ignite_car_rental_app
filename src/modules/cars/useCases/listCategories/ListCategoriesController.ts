import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  private listCategoriesUseCase;

  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const allCategories = await listCategoriesUseCase.execute();

    return res.status(200).json(allCategories);
  }
}
