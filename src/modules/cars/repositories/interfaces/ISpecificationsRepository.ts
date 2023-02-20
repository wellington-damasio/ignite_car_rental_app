import { Specification } from "../../infra/typeorm/entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create: ({ name, description }: ICreateSpecificationDTO) => void;
  list: () => Promise<Specification[]>;
  findByName: (name: string) => Promise<Specification>;
  findByIds: (ids: string[]) => Promise<Specification[]>
}
