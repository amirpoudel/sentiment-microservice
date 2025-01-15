

from confluent_kafka import Consumer, Producer , KafkaException # type: ignore
from analysis import sentimentAnalysis
from dotenv import load_dotenv # type: ignore
import os

# Load environment variables from the .env file
load_dotenv()



import json

kafka_broker = os.getenv('KAFKA_BROKER')

# Kafka Consumer Configuration
conf = {
    'bootstrap.servers': kafka_broker,
    'group.id': 'new-reviews-group',
    'auto.offset.reset': 'earliest'
}


#due to some error define producer here
# Define Kafka producer configuration
producerConf = {
    'bootstrap.servers': kafka_broker,  # Kafka broker address
    'client.id': 'reviews'
}

# Create a Producer instance with the configuration
kafkaProducer = Producer(producerConf)


def produceMessage(message):
    # Produce message to the topic 'new-reviews-result'
    kafkaProducer.produce('reviews-result', message)
    kafkaProducer.flush()
    print(f"Produced message: {message}")

# Create Consumer instance
consumer = Consumer(conf)
topic = 'new-reviews'
consumer.subscribe([topic])

def consumeMessage():
    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF: # type: ignore
                    continue
                else:
                    raise KafkaException(msg.error())
           
            message = json.loads(msg.value().decode('utf-8'))

            # Check if 'review' key exists in the message
            if 'review' in message:
                result = sentimentAnalysis(message['review'])
                print(result)
                
                # Produce message
                data = {
                    'processId': message.get('processId'),
                    'userId': message.get('userId'),
                    'reviewId': message.get('reviewId'),
                    'review': message['review'],
                    'sentiment': result[0],
                    'score': result[1]
                }

                produceMessage(json.dumps(data))
            else:
                print("Key 'review' not found in the message")
                
    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()
