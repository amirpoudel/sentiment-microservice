import { Kafka } from "kafkajs";
import {ReviewService} from "../../../services/review.service";
import {ReviewRepository} from "../../../infrastructure/data-access/repositories/review.repository";
import { randomUUID } from "crypto";
import { CacheEnabledStrategy } from "../../data-access/cache/strategy.cache";

const cacheStrategy = new CacheEnabledStrategy()
const reviewRepository = new ReviewRepository(cacheStrategy);
const reviewService = new ReviewService(reviewRepository);

export const kafka = new Kafka({
    clientId: 'reviews',
    brokers: ["192.168.1.66:9092"]
})




export async function consumeMessage(){

    const consumer = kafka.consumer(
        {
            groupId:"reviews-result-group"
        }
    )

    await consumer.connect();

    await consumer.subscribe({
        topics:['reviews-result'] , fromBeginning:true
    })

    // options
    // single entry 
    // bulk entry 

    await consumer.run({
        eachMessage: async ({topic,partition,message,heartbeat,pause})=>{
            console.log(` [${topic}] : PART: ${partition} : }`,message?.value!.toString())
            const input = JSON.parse(message?.value!.toString())
            console.log("parse input",input)
            const data = {
                bulkProcessId: input.bulkProcessId,
                userId: randomUUID(),
                title: input.review,
                sentiment: input.sentiment,
                
            }
            reviewService.createReview(data)


        }
    })

   
}