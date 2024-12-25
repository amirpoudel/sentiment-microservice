import {kafka} from './client.kafka';



export async function produceMessage(key:string,value:string):Promise<void>{
    const producer = kafka.producer();
    
    await producer.connect();
    console.log('Producer Connected Successfully')
    const resonse = await producer.send({
        topic:'new-reviews',
        messages:[
            {
                partition:0,
                key:key,
                value:value
            }
        ]
    })
    console.log("message resonse",resonse);

    await producer.disconnect();
}


