import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/interfaces/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository";

@injectable()
class RentalReturnUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {}

  async execute(id: string): Promise<Rental> { 
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    const minimumDailyRentalAmount = 1

    if(!rental) {
      throw new AppError("Rental does not exist")
    }

    const dateNow = this.dateProvider.dateNow()

    let dailyRentalAmount = this.dateProvider.compareInDays(rental.start_date, dateNow)

    if(dailyRentalAmount <= 0) {
      dailyRentalAmount = minimumDailyRentalAmount
    }

    const dailyRentalDelay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow  
    )

    let totalBill = 0

    if(dailyRentalDelay > 0) {
      const calculateFine = dailyRentalDelay * car.fine_amount
      totalBill = calculateFine
    }

    totalBill += dailyRentalAmount * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = totalBill

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailability(car.id, true)

    return rental
  }
}

export {RentalReturnUseCase}