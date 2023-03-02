import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError("No token was passed");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    // const usersRepository = new UsersRepository();
    const userExists = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userExists) {
      throw new AppError("User does not exists");
    }

    req.user = { id: user_id };
    next();
  } catch (error) {
    throw new AppError("Invalid token");
  }
};
