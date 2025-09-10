import app from './app.js';
import dotenv from 'dotenv';
import mongoose from './database.js';

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Servicio corriendo en puerto ${PORT}`);
});