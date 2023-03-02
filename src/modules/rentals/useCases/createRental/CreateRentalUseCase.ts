import { inject, injectable } from "tsyringe"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { ICarsRepository } from "../../../cars/repositories/interfaces/ICarsRepository"
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider,
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({user_id, car_id, expected_return_date}: IRequest) {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id)
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(user_id)
    const minimumRentTime = 24
    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if(carUnavailable) {
      throw new AppError("Car is not available")
    }

    if(rentalOpenToUser) {
      throw new AppError("User already has an rented car")
    }

    if(compare < minimumRentTime) {
      throw new AppError("Rent time is less than 24 hours")
    }

    const rental = this.rentalsRepository.create({user_id, car_id, expected_return_date})
    await this.carsRepository.updateAvailability(car_id, false)
    return rental
  }
}

export {CreateRentalUseCase}