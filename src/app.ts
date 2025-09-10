import express, { type Application } from 'express';
import router from './routes/auth.js';
import morgan from 'morgan';

const app: Application = express();

//Routes
app.use('/api', router);

//Middlewares
app.use(morgan('dev'));

export default app;