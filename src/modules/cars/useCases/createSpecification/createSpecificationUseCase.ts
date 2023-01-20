import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async exectute({ name, description }: IRequest) {
    const specificationExists = await this.specificationsRepository.findByName(
      name
    );

    if (specificationExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
