import { AppError } from "../../../../shared/errors/AppError"
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: 'Category test',
      description: 'Just testing...'
    }
    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a category that already exists", async () => {
    const category = {
      name: 'Category test',
      description: 'Just testing...'
    }
    await createCategoryUseCase.execute(category)

    await expect(async () => {
      await createCategoryUseCase.execute(category)
    }).rejects.toEqual(new AppError("Category already exists"))
  })
})
