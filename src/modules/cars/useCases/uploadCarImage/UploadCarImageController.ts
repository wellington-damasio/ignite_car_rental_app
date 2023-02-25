import { Request, Response } from "express"
import { container } from "tsyringe"
import { UploadCarImageUseCase } from "./UploadCarImageUseCase"

interface IFiles {
  filename: string
}

class UploadCarImageController {
  async handle(req: Request, res: Response) {
    const {id} = req.params
    const images = req.files as IFiles[]

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)
    const fileNames = images.map(file => file.filename)

    await uploadCarImageUseCase.execute({
      car_id: id,
      image_names: fileNames
    })

    return res.status(201).send()
  }
}

export {UploadCarImageController}