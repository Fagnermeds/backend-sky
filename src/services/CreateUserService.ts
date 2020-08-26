import IUsersRepository, {
  UserDataProps,
} from '../repositories/interfaces/IUsersRepository';
import AppError from '../errors/AppError';
import { IUserSchema } from '../schemas/User';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

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
