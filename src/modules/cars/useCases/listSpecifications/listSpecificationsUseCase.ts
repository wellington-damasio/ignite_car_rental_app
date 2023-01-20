import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute() {
    return await this.specificationsRepository.list();
  }
}
