import { getRepository, Repository } from "typeorm";
import { ICarsRepository, ICreateCarDTO } from "../../../repositories/interfaces/ICarsRepository";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    brand,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      specifications,
    })

    await this.repository.save(car)

    return car
  }

  async listAvailable({ brand, name, category_id }): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name })
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()
    return cars
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    })

    return car
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id: car_id
      }
    })

    return car
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({available})
      .where("id = :id")
      .setParameters({id})
      .execute()
  }
}