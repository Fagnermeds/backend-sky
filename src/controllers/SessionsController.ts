import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionsController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await this.authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default SessionsController;
