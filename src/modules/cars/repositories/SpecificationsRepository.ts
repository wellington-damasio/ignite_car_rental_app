import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository } from "./interfaces/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }) {
    const newSpecification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(newSpecification);
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }
}
