import { Rental } from "../../infra/typeorm/entities/Rental"

export interface ICreateRentalDTO {
  car_id: string
  user_id: string
  expected_return_date: Date
}

export interface IRentalsRepository {
  findOpenRentalByCarId: (car_id: string) => Promise<Rental>
  findOpenRentalByUserId: (user_id: string) => Promise<Rental>
  create:({car_id, user_id, expected_return_date}: ICreateRentalDTO) => Promise<Rental>
}