import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'The coolest car ever!',
      daily_rate: 167,
      license_plate: 'AGT-9081',
      fine_amount: 78,
      brand: 'Honda',
      category_id: 'uhyas781672a'
    })

    const car2 = await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'The coolest car ever!',
      daily_rate: 167,
      license_plate: 'AGT-9081',
      fine_amount: 78,
      brand: 'Honda',
      category_id: 'uhyas781672a'
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car, car2])
  })
}) 