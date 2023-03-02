import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase"

let sendForgottenPasswordMailUseCase: SendForgottenPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProviderInMemory: MailProviderInMemory

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProviderInMemory = new MailProviderInMemory()

    sendForgottenPasswordMailUseCase = new SendForgottenPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    )
  })

  it("Shoudl be able to send a forgot  password mail to use", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail")

    await usersRepositoryInMemory.create({
      name: "Ulisses",
      email: "ulisses103@gmail.com",
      password: "whatever123",
      driver_license: "YUQSA-28312",
    })

    await sendForgottenPasswordMailUseCase.execute("ulisses103@gmail.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it("Should not be able to send mail if user doesn't exist", async () => {
    await expect(
      sendForgottenPasswordMailUseCase.execute("kaju@gmail.com")
    ).rejects.toEqual(new AppError("User does not exist"))
  })

  it("Should create a new user token", async () => {
    const generateNewToken = jest.spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      name: "Ulisses",
      email: "ulisses103@gmail.com",
      password: "whatever123",
      driver_license: "YUQSA-28312",
    })

    await sendForgottenPasswordMailUseCase.execute("ulisses103@gmail.com")

    expect(generateNewToken).toHaveBeenCalled()
  })
})