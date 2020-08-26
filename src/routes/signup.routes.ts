import { Router, request } from 'express';

import UsersController from '../controllers/UsersController';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/implementations/UsersRepository';
import HashProvider from '../providers/HashProvider/implementations/HashProvider';
import ShowUserService from '../services/ShowUserService';

const signupRouter = Router();

const usersRepository = new UsersRepository();
const hashProvider = new HashProvider();
const createUser = new CreateUserService(usersRepository, hashProvider);
const showUser = new ShowUserService(usersRepository);

const usersController = new UsersController(createUser, showUser);

signupRouter.post('/', (request, response) =>
  usersController.create(request, response),
);

export default signupRouter;
