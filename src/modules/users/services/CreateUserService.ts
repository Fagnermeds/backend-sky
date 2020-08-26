import IUsersRepository, {
  UserDataProps,
} from '@modules/users/repositories/interfaces/IUsersRepository';
import { IUserSchema } from '@modules/users/infra/mongoose/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../../../providers/HashProvider/interfaces/IHashProvider';

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    phones,
  }: UserDataProps): Promise<IUserSchema> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('This email already exists', 409);
    }

    const hashPassword = await this.hashProvider.generateHashPassword(password);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      phones,
    });

    return createdUser;
  }
}

export default CreateUserService;
