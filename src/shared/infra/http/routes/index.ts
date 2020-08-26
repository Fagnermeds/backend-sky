import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import signupRouter from '@modules/users/infra/http/routes/signup.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/signup', signupRouter);
routes.use('/signin', sessionsRouter);
routes.use('/users', ensureAuthenticated, usersRouter);

export default routes;
