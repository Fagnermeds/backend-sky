import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';

class UsersController {
  constructor(
    private createUser: CreateUserService,
    private showUser: ShowUserService,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phones } = request.body;

    try {
      const user = await this.createUser.execute({
        name,
        email,
        password,
        phones,
      });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const user = await this.showUser.execute(id);

      return response.json(user);
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default UsersController;
