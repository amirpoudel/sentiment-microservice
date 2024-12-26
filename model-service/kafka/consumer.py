

from confluent_kafka import Consumer, KafkaException # type: ignore
from analysis import sentimentAnalysis

# Kafka Consumer Configuration
conf = {
    'bootstrap.servers': '92.168.1.65:9092',
    'group.id': 'result-service',
    'auto.offset.reset': 'earliest'
}

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
            print(f"Received message: {msg.value().decode('utf-8')}")
            result = sentimentAnalysis(msg.value().decode('utf-8'))
            #produce message
            

    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()


