import { CarImage } from "../../infra/typeorm/entities/CarImage"


export interface ICarImagesRepository {
  create: (car_id: string, image_name: string) => Promise<CarImage> 
}