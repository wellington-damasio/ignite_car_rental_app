import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory


describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })

  it("Should not be able to add a specification to a non-existent car", async () => {
    const invalidCarId = "2718ah"
    const invalidSpecificationId = ["716asq"]
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: invalidCarId,
        specifications_id: invalidSpecificationId
      })
    ).rejects.toEqual(new AppError("Car doesn't exists"))
  })

  it("Should be able to add a specification to an existing car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'The coolest car ever!',
      daily_rate: 167,
      license_plate: 'AGT-9081',
      fine_amount: 78,
      brand: 'Honda',
      category_id: 'uhyas781672a'
    })

    await specificationsRepositoryInMemory.create({
      name: 'Manual',
      description: 'Has manual transmission'
    })

    const specificationExists = await specificationsRepositoryInMemory.findByName('Manual')

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specificationExists.id]
    })

    expect(car.specifications.length).toBeGreaterThanOrEqual(1)
  })
})