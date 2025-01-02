from fastapi import FastAPI, BackgroundTasks # type: ignore
from kafka.consumer import consumeMessage
import uvicorn   # type: ignore

app = FastAPI()

# Function to consume messages in the background
def consume_messages():
    while True:
        consumeMessage()  # Continuously consume messages from Kafka

@app.on_event("startup")
async def startup_event():
    # Start consuming messages in the background when the server starts
    import threading
    thread = threading.Thread(target=consume_messages)
    thread.start()





@app.get("/health")
def health():
    return {"status": "ok"}





# Run the FastAPI app programmatically with uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9000)  # type: ignore # Specify port 9000 and host 0.0.0.0





