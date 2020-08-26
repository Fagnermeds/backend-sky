import { v4 } from 'uuid';

import User, { IUserSchema } from '../../schemas/User';
import Phone from '../../schemas/Phone';
import IUsersRepository, {
  UserDataProps,
} from '../interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<IUserSchema> {
    const user = await User.findById(id)
      .select('_id name email phones last_login')
      .populate({ path: 'phones', select: 'ddd number -_id' })
      .exec();

    return user;
  }

  public async findByEmail(email: string): Promise<IUserSchema> {
    const user = await User.findOne({
      email,
    })
      .select('_id name email phones last_login')
      .populate({ path: 'phones', select: 'ddd number -_id' })
      .exec();

    return user;
  }

  public async create({
    name,
    email,
    password,
    phones,
  }: UserDataProps): Promise<IUserSchema> {
    const _id = v4();

    const createdPhoneReferences = (await Phone.create(phones)).map(
      item => item._id,
    );

    const createdUser = await User.create({
      _id,
      name,
      email,
      password,
      phones: createdPhoneReferences,
    });

    return User.findById(createdUser._id)
      .populate({ path: 'phones', select: 'ddd number -_id' })
      .exec();
  }

  public getPasswordUser = async (id: string): Promise<string> => {
    const { password } = await User.findById(id).select('+password');

    return password;
  };
}

export default UsersRepository;
