from test import SentimentAnalyzer

model_path = "./sentiment_model_uncased"
sentiment = SentimentAnalyzer(model_path, model_path)





def sentimentAnalysis(text):
    cleaned_text = sentiment.clean_text(text)
    result = sentiment.predict(cleaned_text)
   

    sentiment_label, scores = result
    sentiment_labels = ["Negative", "Neutral", "Positive"]

    return result  







  



    

