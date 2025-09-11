import express, { type Application } from 'express';
import router from './routes/auth.js';
import morgan from 'morgan';

const app: Application = express();

//settings
app.use(express.json());

//Routes
app.use('/api/users', router);

//Middlewares
app.use(morgan('dev'));

export default app;