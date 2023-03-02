import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../interfaces/IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[] = []

  async create ({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserToken> {
    return this.usersTokens.find(token => 
      token.user_id === user_id && token.refresh_token === refresh_token
    )
  }

  async deleteById (id: string): Promise<void> {
    this.usersTokens.filter(token => token.id !== id)
  }
  async findByRefreshToken (token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(userToken => userToken.refresh_token === token)

    return userToken
  }
}

export {UsersTokensRepositoryInMemory}