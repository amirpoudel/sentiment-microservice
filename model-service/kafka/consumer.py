

from confluent_kafka import Consumer, Producer , KafkaException # type: ignore
from analysis import sentimentAnalysis



import json

# Kafka Consumer Configuration
conf = {
    'bootstrap.servers': '192.168.1.68:9092',
    'group.id': 'new-reviews-group',
    'auto.offset.reset': 'earliest'
}


#due to some error define producer here
# Define Kafka producer configuration
producerConf = {
    'bootstrap.servers': '192.168.1.68:9092',  # Kafka broker address
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
        
            result = sentimentAnalysis(message['review'])
            print(result)
            #produce message

            data = {
                'processId': message['processId'],
                'reviewId': message['reviewId'],
                'review': message['review'],
                'sentiment': result[0],
                'score':result[1]
            }
            

            produceMessage(json.dumps(data))

            

    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()


