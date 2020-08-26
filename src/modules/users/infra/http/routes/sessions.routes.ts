import { Router } from 'express';

import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import SessionsController from '../../../../../controllers/SessionsController';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import HashProvider from '../../../../../providers/HashProvider/implementations/HashProvider';

const sessionsRouter = Router();

const usersRepository = new UsersRepository();
const hashProvider = new HashProvider();

const sessionsService = new AuthenticateUserService(
  usersRepository,
  hashProvider,
);

const sessionsController = new SessionsController(sessionsService);

sessionsRouter.post('/', (request, response) =>
  sessionsController.create(request, response),
);

export default sessionsRouter;
