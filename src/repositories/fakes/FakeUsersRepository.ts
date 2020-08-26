import { v4 } from 'uuid';

import IUsersRepository, {
  UserDataProps,
} from '../interfaces/IUsersRepository';
import { IUserSchema } from '../../schemas/User';

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

  async create({
    name,
    email,
    password,
    phones,
  }: UserDataProps): Promise<IUserSchema> {
    const _id = v4();

    const user = {
      _id,
      name,
      email,
      password,
      phones,
    };

    this.users.push(user);

    return user;
  }
}

export default UsersFakeRepository;
