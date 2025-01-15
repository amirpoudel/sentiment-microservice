import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "reviews",
  brokers: [process.env.KAFKA_BROKER!],
});

export async function kafkaInit() {
  const admin = kafka.admin();

  try {
    console.log("Admin Connecting......");
    await admin.connect();
    console.log("Admin Connect Success");

    // Create topics
    const topicCreationResponse = await admin.createTopics({
      topics: [
        {
          topic: "new-reviews",
          numPartitions: 1,
          replicationFactor: 1, // Ensure this matches your broker configuration
        },
        {
          topic: "reviews-result",
          numPartitions: 1,
          replicationFactor: 1, // Ensure this matches your broker configuration
        },
      ],
    });

    if (topicCreationResponse) {
      console.log("Topic Created Success");
    } else {
      console.log("Topics already exist or creation skipped.");
    }
  } catch (error) {
    console.error("Kafka Admin Init Error:", error);
  } finally {
    await admin.disconnect();
    console.log("Admin Disconnected");
  }
}
