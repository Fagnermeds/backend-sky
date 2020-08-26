import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import HashProvider from '@modules/users/providers/HashProvider/implementations/HashProvider';
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';

const hashProvider = new HashProvider();
const usersRepository = new UsersRepository();

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phones } = request.body;

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      name,
      email,
      password,
      phones,
    });

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService(usersRepository);

    const user = await showUser.execute(id);

    return response.json(user);
  }
}

export default UsersController;
