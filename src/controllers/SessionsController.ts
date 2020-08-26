import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionsController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    console.log(email, password);

    try {
      const { user, token } = await this.authenticateUserService.execute({
        email,
        password,
      });

      return response.json({ user, token });
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export default SessionsController;
