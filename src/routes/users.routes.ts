import { Router, request } from 'express';

import UsersController from '../controllers/UsersController';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/implementations/UsersRepository';
import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import ShowUserService from '../services/ShowUserService';

const usersRouter = Router();

const usersRepository = new UsersRepository();
const hashProvider = new HashProvider();
const createUser = new CreateUserService(usersRepository, hashProvider);
const showUser = new ShowUserService(usersRepository);

const usersController = new UsersController(createUser, showUser);

usersRouter.get('/:id', (request, response) =>
  usersController.show(request, response),
);

export default usersRouter;
