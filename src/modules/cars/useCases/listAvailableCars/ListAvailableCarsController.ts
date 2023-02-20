import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const { brand, name, category_id } = req.query

    const ListAvailableCarsController = container.resolve(ListAvailableCarsUseCase)
    const allCategories = await ListAvailableCarsController.execute({ brand, name, category_id })

    return res.json(allCategories)
  }
}