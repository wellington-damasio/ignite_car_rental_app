import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";

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
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
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
    const token = sign({}, "4c65c7b701a100c3e9ecbc09964403da", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
