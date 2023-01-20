import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./listSpecificationsUseCase";

export class ListSpecificationsController {
  private listSpecificationsUseCase;

  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );
    const allSpecifications = await listSpecificationsUseCase.execute();

    return res.status(200).json(allSpecifications);
  }
}
