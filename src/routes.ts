import { Router } from 'express';

const routes = Router();

routes.get('/users', (request, response) =>
  response.status(201).json([
    {
      name: 'Fagner',
      email: 'fagnermeds@gmail.com',
      password: '123456',
    },
    {
      name: 'Maria',
      email: 'maria@gmail.com',
      password: 'maria123',
    },
  ]),
);

export default routes;
