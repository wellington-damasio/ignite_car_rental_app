import { Category } from "../../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => void;
  list: () => Promise<Category[]>;
  findById: (id: string) => Promise<Category | false>;
  findByName: (name: string) => Promise<Category | false>;
}
