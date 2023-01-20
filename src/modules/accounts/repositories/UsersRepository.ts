import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { IUsersRepository } from "./interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, password, email, driver_license, avatar, id }) {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async list() {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return user;
  }

  async findById(id: string) {
    try {
      const user = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (user) {
        return user;
      }
    } catch (e) {
      return false;
    }
  }
}
