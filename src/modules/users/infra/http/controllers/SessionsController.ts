import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import HashProvider from '@modules/users/providers/HashProvider/implementations/HashProvider';

const usersRepository = new UsersRepository();
const hashProvider = new HashProvider();

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default SessionsController;
