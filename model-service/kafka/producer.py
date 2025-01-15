from confluent_kafka import Producer # type: ignore
from dotenv import load_dotenv # type: ignore
import os

# Load environment variables from the .env file
load_dotenv()



kafka_broker = os.getenv('KAFKA_BROKER')
# Define Kafka producer configuration
conf = {
    'bootstrap.servers': kafka_broker,  # Kafka broker address
    'client.id': 'reviews'
}

# Create a Producer instance with the configuration
kafkaProducer = Producer(conf)


def produceMessage(message):
    # Produce message to the topic 'new-reviews-result'
    kafkaProducer.produce('reviews-result', message)
    kafkaProducer.flush()
    print(f"Produced message: {message}")