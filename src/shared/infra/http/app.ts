import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';

import routes from './routes';
import globalHandling from './middlewares/globalHandling';
import '../database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(globalHandling);

export default app;
