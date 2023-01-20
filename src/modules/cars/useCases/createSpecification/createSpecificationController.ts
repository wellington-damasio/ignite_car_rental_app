import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";
import { container } from "tsyringe";

export class CreateSpecificationController {
  private createSpecificationUseCase;

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    await createSpecificationUseCase.exectute({ name, description });
    return res.status(201).send();
  }
}
