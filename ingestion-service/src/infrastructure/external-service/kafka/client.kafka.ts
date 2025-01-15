import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'reviews',
    brokers: [process.env.KAFKA_BROKER!]
})
