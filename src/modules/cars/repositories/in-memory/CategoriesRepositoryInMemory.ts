import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)
    return category
  }
  async list(): Promise<Category[]> {
    return this.categories
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category()

    Object.assign(newCategory, {
      name,
      description
    })

    this.categories.push(newCategory)
  }

  async findById(id: string): Promise<Category | false> {
    const category = this.categories.find(category => category.id === id)
    return category
  }
}

export { CategoriesRepositoryInMemory }