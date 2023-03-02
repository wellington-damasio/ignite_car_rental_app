import { Car } from "../../infra/typeorm/entities/Car"
import { Specification } from "../../infra/typeorm/entities/Specification"

export interface ICreateCarDTO {
  name: string,
  description: string,
  daily_rate: number,
  license_plate: string,
  fine_amount: number,
  brand: string,
  category_id: string,
  specifications?: Specification[]
}

export interface IListAvailableCarsDTO {
  brand?: any
  name?: any
  category_id?: any
}

export interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>
  findByLicensePlate: (license_plate: string) => Promise<Car>
  listAvailable: ({ brand, name, category_id }: IListAvailableCarsDTO) => Promise<Car[]>
  findById: (car_id: string) => Promise<Car>
  updateAvailability(id: string, available: boolean): Promise<void>
}