import { inject, injectable } from "tsyringe";
import { ICarImagesRepository } from "../../repositories/interfaces/ICarImagesRepository";

interface IRequest {
  car_id: string,
  image_names: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository") 
    private carsImageRepository: ICarImagesRepository
  ) {}

  async execute({car_id, image_names}: IRequest) {

    image_names.map(async (img) => {
      await this.carsImageRepository.create(car_id, img)
    })
  }
}

export {UploadCarImageUseCase}