import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/testdb')
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

export default mongoose;