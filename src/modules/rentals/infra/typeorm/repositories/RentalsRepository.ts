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
        end_date: null
      }
    })
    
    return openRentalByCar
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const openRentalByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    })

    return openRentalByUser
  }
  async create({ car_id, user_id, expected_return_date, end_date, total, id}: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      total,
      id
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        id
      }
    })
  }

  async findByUserId (id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {user_id: id},
      relations: ["car"]
    })
    return rentals
  }
}