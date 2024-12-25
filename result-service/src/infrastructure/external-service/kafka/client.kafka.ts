import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'reviews',
    brokers: ["192.168.1.65:9092"]
})





export async function consumeMessage(){

    const consumer = kafka.consumer(
        {
            groupId:"result-service"
        }
    )

    await consumer.connect();

    await consumer.subscribe({
        topics:['new-reviews'] , fromBeginning:true
    })

    await consumer.run({
        eachMessage: async ({topic,partition,message,heartbeat,pause})=>{
            console.log(` [${topic}] : PART: ${partition} : }`,message?.value!.toString())
        }
    })

   
}
