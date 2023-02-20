import { User } from "../../infra/typeorm/entities/User";

export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

export interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  list: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | false>;
  findById: (id: string) => Promise<User | false>;
}
