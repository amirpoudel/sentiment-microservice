import {kafka} from "./client.kafka"

async function init(){
    try {
        const admin  = kafka.admin()
        console.log("Admin Connecting......")
        admin.connect()
        console.log("Admin Connect Success")
    
        // create topic 
        admin.createTopics({
            topics:[{
                topic:'new-reviews',
                numPartitions:1
    
            },{
                topic: 'reviews-result',
                numPartitions:1
            }]
        })
        console.log("Topic Created Success")
    
        await admin.disconnect();
    } catch (error) {
        console.log("Kafka Admin Init Error",error);
    }
}

init();