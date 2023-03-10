import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/interfaces/ICarsRepository"
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository"

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError("Car doesn't exists")
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id)

    carExists.specifications = specifications

    return await this.carsRepository.create(carExists)
  }
}