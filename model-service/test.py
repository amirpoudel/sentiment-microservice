import re
from transformers import BertForSequenceClassification, BertTokenizer # type: ignore
import torch # type: ignore

class SentimentAnalyzer:
    
    def __init__(self,model_path,tokenizer_path):
        self.model =BertForSequenceClassification.from_pretrained(model_path)
        self.tokenizer = BertTokenizer.from_pretrained(tokenizer_path)
        
        # self.sentiment_pipeline = pipeline(
        #     "sentiment-analysis",
        #     model=self.model,
        #     tokenizer=self.tokenizer,
        #     device=0 if torch.cuda.is_available() else -1
        # )
        
        # self.label_map = {0: "neutral", 1: "positive", 2: "negative"}

    def clean_text(self,text):
        return re.sub(r'\s+',' ',text.strip().lower())

    def predict(self,text):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True)
        with torch.no_grad():
            logits = self.model(**inputs).logits
        predicted_class = torch.argmax(logits, dim=1).item()
        scores = torch.nn.functional.softmax(logits, dim=1).tolist()[0]

        sentiment_map = {0: "negative", 1: "neutral", 2: "positive"}
        return sentiment_map[predicted_class], scores

