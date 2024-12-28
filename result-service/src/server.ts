import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

import app from './app';
import { consumeMessage } from './infrastructure/external-service/kafka/consume.kafka';

const PORT = process.env.PORT || 7000;

// for testion only 
consumeMessage();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});