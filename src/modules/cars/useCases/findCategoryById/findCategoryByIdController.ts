import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindCategoryByIdUseCase } from "./findCategoryByIdUseCase";

export class FindCategoryByIdController {
  private findCategoryUseCase;

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const findCategoryByIdUseCase = await container.resolve(
      FindCategoryByIdUseCase
    );
    const category = await findCategoryByIdUseCase.execute(id);

    return res.status(200).json(category);
  }
}
