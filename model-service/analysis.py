from test import SentimentAnalyzer

model_path = "./sentiment_model_uncased"
sentiment = SentimentAnalyzer(model_path, model_path)





def sentimentAnalysis(text):
    cleaned_text = sentiment.clean_text(text)
    result = sentiment.predict(cleaned_text)
   

    sentiment_label, scores = result
    score = 0
    sentiment_labels = ["Negative", "Neutral", "Positive"]
    if sentiment_label == "negative":
        score = scores[0]

    if sentiment_label == "neutral":
        score = scores[1]

    if sentiment_label == "positive":
        score = scores[2]

    

    return [sentiment_label,score]  







  



    

