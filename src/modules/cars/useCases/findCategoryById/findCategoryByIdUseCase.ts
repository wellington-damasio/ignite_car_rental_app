import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/interfaces/ICategoriesRepository";

@injectable()
export class FindCategoryByIdUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<Category | false> {
    const category = await this.categoriesRepository.findById(id);
    console.log(category);

    if (!category) {
      throw new AppError("Category does not exists");
    }

    return category;
  }
}
