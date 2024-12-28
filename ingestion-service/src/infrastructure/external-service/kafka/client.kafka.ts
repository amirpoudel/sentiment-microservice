import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'reviews',
    brokers: ["192.168.1.66:9092"]
})
