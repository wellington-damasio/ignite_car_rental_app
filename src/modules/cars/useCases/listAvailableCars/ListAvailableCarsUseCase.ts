import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, IListAvailableCarsDTO } from "../../repositories/interfaces/ICarsRepository";

@injectable()
export class ListAvailableCarsUseCase {
  constructor(@inject("CarsRepository") private carsRepository: ICarsRepository) { }

  async execute({ brand, name, category_id }: IListAvailableCarsDTO): Promise<Car[]> {
    return await this.carsRepository.listAvailable({ brand, name, category_id })
  }
}