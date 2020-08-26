import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import signupRouter from './signup.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/signup', signupRouter);
routes.use('/signin', sessionsRouter);
routes.use('/users', ensureAuthenticated, usersRouter);

export default routes;
