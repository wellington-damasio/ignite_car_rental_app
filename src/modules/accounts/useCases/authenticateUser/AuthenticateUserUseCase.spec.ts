import { AppError } from "../../../../shared/errors/AppError";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/interfaces/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider";

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider)
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

  it("should not be able to authenticate a non-existent user", async () => {
    await expect(authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "1234bolinho"
      })).rejects.toEqual(new AppError("Email or password is wrong. Please try again"))
  })

  it("should not be able to authenticate user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: 'yatw2314',
      email: "user@test.com",
      password: "error123",
      name: "Error User"
    }
    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongPassword'
      })
    ).rejects.toEqual(new AppError("Email or password is wrong. Please try again"))
  })
})