import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../interfaces/ISpecificationsRepository";

export class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const newSpecification = new Specification()

    Object.assign(newSpecification, { name, description })

    this.specifications.push(newSpecification)
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(spec => spec.name === name)
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = []

    ids.forEach(id => {
      const specificationExists = this.specifications.find(spec => spec.id === id)
      if (specificationExists) {
        specifications.push(specificationExists)
      }
    })

    return specifications
  }
}