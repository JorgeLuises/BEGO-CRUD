import express, { type Application } from 'express';
import userRouter from './routes/auth.js';
import truckRouter from './routes/truck.js';
import morgan from 'morgan';

const app: Application = express();

//settings
app.use(express.json());

//Routes
app.use('/api/users', userRouter);
app.use('/api/trucks', truckRouter);

//Middlewares
app.use(morgan('dev'));

export default app;