import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const signupRouter = Router();

const usersController = new UsersController();

signupRouter.post('/', usersController.create);

export default signupRouter;
