// import { v4 } from 'uuid';

import { IUserSchema } from '@modules/users/infra/mongoose/entities/User';
import IUsersRepository, {
  UserDataProps,
} from '../interfaces/IUsersRepository';

class UsersFakeRepository implements IUsersRepository {
  private users: IUserSchema[] = [];

  async findById(id: string): Promise<IUserSchema> {
    const user = this.users.find(item => item._id === id);

    return user;
  }

  async findByEmail(email: string): Promise<IUserSchema> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  // async create({
  //   name,
  //   email,
  //   password,
  //   phones,
  // }: UserDataProps): Promise<void> {
  //   const _id = v4();

  //   const user = {
  //     _id,
  //     name,
  //     email,
  //     password,
  //     phones,
  //   };
  // }
}

export default UsersFakeRepository;
