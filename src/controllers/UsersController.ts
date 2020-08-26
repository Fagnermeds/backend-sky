import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
  constructor(private createUser: CreateUserService) {}

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
}

export default UsersController;
