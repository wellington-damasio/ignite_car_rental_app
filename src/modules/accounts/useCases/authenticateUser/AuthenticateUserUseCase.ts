import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider") private dateProvider: IDateProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse | false> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password is wrong. Please try again");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password is wrong. Please try again");
    }

    // Generate JWT
    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshTokenExpiresDate
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token
    };

    return tokenReturn;
  }
}
