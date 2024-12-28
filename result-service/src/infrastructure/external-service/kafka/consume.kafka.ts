import { Kafka } from "kafkajs";
import {ReviewService} from "../../../services/review.service";
import {ReviewRepository} from "../../../infrastructure/data-access/repositories/review.repository";

const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);

export const kafka = new Kafka({
    clientId: 'reviews',
    brokers: ["192.168.1.66:9092"]
})




export async function consumeMessage(){

    const consumer = kafka.consumer(
        {
            groupId:"review"
        }
    )

    await consumer.connect();

    await consumer.subscribe({
        topics:['rresult-service'] , fromBeginning:true
    })

    // options
    // single entry 
    // bulk entry 

    await consumer.run({
        eachMessage: async ({topic,partition,message,heartbeat,pause})=>{
            console.log(` [${topic}] : PART: ${partition} : }`,message?.value!.toString())
            const input = JSON.parse(message?.value!.toString())
            console.log("parse input",input)
            reviewService.createReview(input)


        }
    })

   
}
