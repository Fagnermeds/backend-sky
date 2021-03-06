import { sign } from 'jsonwebtoken';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import tokenConfig from '@config/token';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import { IUserSchema } from '../infra/mongoose/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUserSchema;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const userPassword = await this.usersRepository.getPasswordUser(user._id);

    const isEqualPasswords = await this.hashProvider.comparePasswordWithHash(
      password,
      userPassword,
    );

    if (!isEqualPasswords) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = tokenConfig.jwt;

    const token = sign({}, secret, {
      subject: `${user._id}`,
      expiresIn,
    });

    user.updateOne({ last_login: new Date() }).exec();

    Object.assign(user, { last_login: new Date() });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
