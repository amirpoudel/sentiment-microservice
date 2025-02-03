import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

import app from './app';
import './presentation/grpc/grpc.server'

import { connectToDatabase } from './infrastructure/config'


const PORT = process.env.PORT || 4000;

// connecto to mongodb
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


