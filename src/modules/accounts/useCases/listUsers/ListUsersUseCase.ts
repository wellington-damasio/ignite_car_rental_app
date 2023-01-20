import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute() {
    return this.usersRepository.list();
  }
}
