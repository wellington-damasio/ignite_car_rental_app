import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<boolean> {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new AppError("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
    return true;
  }
}
