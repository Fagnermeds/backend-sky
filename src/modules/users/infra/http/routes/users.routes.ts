import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/repositories/implementations/UsersRepository';
import ShowUserService from '@modules/users/services/ShowUserService';
import HashProvider from '../../../../../providers/HashProvider/implementations/HashProvider';
import UsersController from '../../../../../controllers/UsersController';

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
