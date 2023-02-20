import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: 'Civic',
      description: 'The coolest car ever!',
      daily_rate: 167,
      license_plate: 'AGT-9081',
      fine_amount: 78,
      brand: 'Honda',
      category_id: 'uhyas781672a'
    })

    expect(car).toHaveProperty('id')
  })

  it("Should not be able to create a new car if an existing license plate number", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Civic',
        description: 'The coolest car ever!',
        daily_rate: 167,
        license_plate: 'AGT-9081',
        fine_amount: 78,
        brand: 'Honda',
        category_id: 'uhyas781672a'
      })

      await createCarUseCase.execute({
        name: 'Impreza',
        description: 'The second coolest car ever!',
        daily_rate: 211,
        license_plate: 'AGT-9081', // same license plate as the above
        fine_amount: 190,
        brand: 'Subaru',
        category_id: 'uaaas711652a'
      })
    })
  })

  it("Car should be available for rent by default after creation", async () => {
    const newCar = await createCarUseCase.execute({
      name: 'Impreza',
      description: 'The second coolest car ever!',
      daily_rate: 211,
      license_plate: 'ATQ-9022',
      fine_amount: 190,
      brand: 'Subaru',
      category_id: 'uaaas711652a'
    })

    expect(newCar.available).toBeTruthy()
  })
})