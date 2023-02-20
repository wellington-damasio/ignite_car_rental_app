import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/interfaces/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "yuah2134",
      email: "welldam103@gmail.com",
      password: "1234bolinho",
      name: "Wellington"
    }

    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "1234bolinho"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: 'yatw2314',
        email: "user@test.com",
        password: "error123",
        name: "Error User"
      }

      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassword'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})