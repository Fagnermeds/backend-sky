import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/implementations/UsersRepository';
import HashProvider from '../providers/HashProvider/implementations/HashProvider';

const usersRouter = Router();

const usersRepository = new UsersRepository();
const hashProvider = new HashProvider();
const createUser = new CreateUserService(usersRepository, hashProvider);
const usersController = new UsersController(createUser);

usersRouter.post('/', (request, response) =>
  usersController.create(request, response),
);

export default usersRouter;
