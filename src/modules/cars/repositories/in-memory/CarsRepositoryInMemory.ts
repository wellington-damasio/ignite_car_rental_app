import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO, IListAvailableCarsDTO } from "../interfaces/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    specifications
  }: ICreateCarDTO) {
    const car = new Car()

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      specifications
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async listAvailable({ brand, name, category_id }: IListAvailableCarsDTO) {
    let availableCars = this.cars.filter(car => car.available === true)

    if (brand) {
      return availableCars.filter(car => car.brand === brand)
    }

    if (name) {
      return availableCars.filter(car => car.name === name)
    }

    if (category_id) {
      return availableCars.filter(car => car.category_id === category_id)
    }

    return availableCars
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id)
  }
}

export { CarsRepositoryInMemory }