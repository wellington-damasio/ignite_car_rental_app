import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO, IRentalsRepository } from "../../../repositories/interfaces/IRentalsRepository";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const openRentalByCar = await this.repository.findOne({
      where: {
        car_id,
      }
    })
    
    return openRentalByCar
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({
      where: {
        user_id,
      }
    })

    return openRentalByUser
  }
  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id
    })

    await this.repository.save(rental)

    return rental
  }
}