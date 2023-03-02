import { Rental } from "../../infra/typeorm/entities/Rental";
import { ICreateRentalDTO, IRentalsRepository } from "../interfaces/IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = []

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date
    })

    this.rentals.push(rental)

    return rental
  }

  async findOpenRentalByCarId (car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
  }

  async findOpenRentalByUserId (user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id)
  }

  async findByUserId(id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === id)
  }
}

export {RentalsRepositoryInMemory}