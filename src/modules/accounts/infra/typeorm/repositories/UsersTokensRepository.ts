import { Token } from "nodemailer/lib/xoauth2";
import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../../../repositories/interfaces/IUsersTokensRepository";
import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements  IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create({expires_date, refresh_token, user_id}: ICreateUserTokenDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    const userTokens = await this.repository.findOne({
      where: {
        user_id,
        refresh_token
      }
    })
    return userTokens
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const tokenExists = await this.repository.findOne({
      where: {
        refresh_token: token
      }
    })

    return tokenExists
  }
}

export {UsersTokensRepository}