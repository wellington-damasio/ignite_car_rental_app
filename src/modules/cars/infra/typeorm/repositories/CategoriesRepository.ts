import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/interfaces/ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }

  async findById(id: string) {
    try {
      const category = await this.repository.findOne({
        where: { id },
      });

      return category;
    } catch (e) {
      return false;
    }
  }

  async findByName(name: string) {
    try {
      const category = await this.repository.findOne({
        where: {
          name,
        },
      });

      return category;
    } catch (e) {
      return false;
    }
  }
}
