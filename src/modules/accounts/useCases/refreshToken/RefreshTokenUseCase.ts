import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string) {
    const decode = verify(refresh_token, auth.secret_refresh_token) as IPayload
    const {sub: user_id, email} = decode
    
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id, 
      refresh_token
    )

    if(!userToken) {
      throw new AppError("Refresh Token does not exists")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const newRefreshToken = sign({email}, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    const refeshTokenExpiresDate = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date: refeshTokenExpiresDate
    })

    return newRefreshToken
  }
}

export {RefreshTokenUseCase}