import { kafkaInit } from "./kafka.admin";
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

kafkaInit();