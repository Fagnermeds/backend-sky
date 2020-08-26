import { differenceInMinutes } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/interfaces/IUsersRepository';
import { IUserSchema } from '@modules/users/infra/mongoose/entities/User';
import AppError from '@shared/errors/AppError';

const thirtyMinutes = 30;

class ShowUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(id: string): Promise<IUserSchema> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('This user was not found', 404);
    }

    const currentDate = new Date();

    const differenceDateInMinutes = differenceInMinutes(
      currentDate,
      user.last_login,
    );

    if (differenceDateInMinutes > thirtyMinutes) {
      throw new AppError('This session is invalid', 403);
    }

    if (!user) {
      throw new AppError('This user does not exists', 404);
    }

    return user;
  }
}

export default ShowUserService;
