import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!)
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

export default mongoose;