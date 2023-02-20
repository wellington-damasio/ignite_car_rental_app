import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("No token was passed");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "4c65c7b701a100c3e9ecbc09964403da"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const userExists = await usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User does not exists");
    }

    req.user = { id: user_id };
    next();
  } catch (error) {
    throw new AppError("Invalid token");
  }
};
