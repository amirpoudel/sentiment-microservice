from confluent_kafka import Producer # type: ignore

# Define Kafka producer configuration
conf = {
    'bootstrap.servers': '192.168.1.66:9092',  # Kafka broker address
    'client.id': 'reviews'
}

# Create a Producer instance with the configuration
kafkaProducer = Producer(conf)


def produceMessage(message):
    # Produce message to the topic 'new-reviews-result'
    kafkaProducer.produce('reviews-result', message)
    kafkaProducer.flush()
    print(f"Produced message: {message}")