import express from 'express';
import 'express-async-errors';

import routes from './routes';
import globalHandling from './middlewares/globalHandling';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.use(globalHandling);

export default app;
