# Nepali Restaurant Review Sentiment Analysis Finetune Model 🇳🇵🍽️

I'm happy to share my final year college project, which focuses on sentiment analysis of Nepali restaurant reviews written in romanized text. This project follows a microservices architecture, handling ingestion, NLP analysis, result storage, and user management. All services are containerized and deployed using Docker.

## 🛠️ Tech Stack & Architecture

- **Gateway Service (Node.js)** – Request forwarding
- **Ingestion Service (Node.js)** – Processes reviews & pushes them to Kafka
- **NLP Model Service (Python)** – Sentiment analysis using AI
- **Result Service (Node.js)** – Stores & retrieves processed results
- **User Service (Node.js)** – Stores user information
- **Auth Service (Node.js)** – Authorization and Authentication
- **gRPC** – Communication between auth and user service
- **Kafka** – Event-driven communication
- **PostgreSQL & MongoDB** – Data storage
- **Redis** – Caching results
- **Docker** – Containerized deployment

This project aims to enhance restaurant feedback analysis using AI-powered sentiment classification, helping businesses better understand customer sentiments.

## 💍 Key Links

- **📚 API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/19095537/2sAYX2MinG)
- **🤖 Hugging Face Space:** [Model Deployment](https://huggingface.co/spaces/amirpoudel/nepali-romanized-restaurant-sentiment-analysis)
- **🎨 Eraser Link:** [Project Design](https://app.eraser.io/workspace/nWsU3o55FkgoTxAHVlp9)

## 🚀 Running the Project Locally with Docker

To run the project locally using Docker Compose, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo-link.git
   cd your-repo-folder
   ```
2. **Pull the required images and start services:**
   ```bash
   docker-compose -f docker-compose.server-example.yml pull
   docker-compose -f docker-compose.server-example.yml up -d
   ```
3. **Check running containers:**
   ```bash
   docker ps
   ```
4. **Access the API via Postman or your browser** using the endpoints from the API documentation.

To stop the services, run:
```bash
docker-compose -f docker-compose.server-example.yml down
```

Would love to hear your thoughts! 🔥

**Hashtags:** #AI #SentimentAnalysis #Microservices #FinalYearProject #NepaliTech #Docker

---

### 🌟 Project Image:

![System Design](https://raw.githubusercontent.com/amirpoudel/sentiment-microservice/refs/heads/main/system-design.png)

---

