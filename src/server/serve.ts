import express, { Application } from 'express';
import morgan from 'morgan';
import routes from '@routes/route';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use("/api", routes());

export default app;