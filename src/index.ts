import app from './app.js';
import dotenv from 'dotenv';
import mongoose from './database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servicio corriendo en puerto ${PORT}`);
});