import { UserToken } from "../../infra/typeorm/entities/UserToken"

export interface ICreateUserTokenDTO {
  user_id: string
  refresh_token: string
  expires_date: Date
}

export interface IUsersTokensRepository {
 create: ({user_id, expires_date, refresh_token}: ICreateUserTokenDTO) => Promise<UserToken>
 findByUserIdAndRefreshToken: (user_id: string, refresh_token: string) => Promise<UserToken>
 deleteById: (id: string) => Promise<void>
 findByRefreshToken: (token: string) => Promise<UserToken>
}