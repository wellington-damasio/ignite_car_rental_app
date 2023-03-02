import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository"
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository"

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}
  
  async execute({token, password}: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)
    const dateNow = this.dateProvider.dateNow()
    const TokenExpired = this.dateProvider.compareIfBefore(userToken.expires_date, dateNow)

    if(!userToken) {
      throw new AppError("Token invalid")
    }

    if(TokenExpired) {
      throw new AppError("Token expired")
    }

    const user = await this.usersRepository.findById(userToken.user_id)
    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export {ResetPasswordUserUseCase }