import random
import requests
import json
import yfinance as yf

# Define a list of tickers to choose from
tickers_list = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA", "NFLX", "NVDA", "JPM", "BAC"]

# Randomly select 10 tickers
selected_tickers = random.sample(tickers_list, 10)

# News API endpoint and your API key
news_api_url = 'https://newsapi.org/v2/everything'
news_api_key = 'b456584eff374267964f3b17d0b09038'  # Replace with your actual News API key

# List to store the news articles
news_list = []

# Fetch news for each ticker
for ticker in selected_tickers:
    stock = yf.Ticker(ticker)

    # Get the company's name from yfinance
    company_name = stock.info.get('shortName', ticker)

    # Parameters for the news API request
    params = {
        'q': company_name,  # Search query is the company name
        'apiKey': news_api_key,
        'language': 'en',
        'sortBy': 'publishedAt',
        'pageSize': 1  # Get only one article
    }

    # Make the request to the News API
    response = requests.get(news_api_url, params=params)

    # Parse the response as JSON
    news_data = response.json()

    # Check if articles are found
    if news_data['status'] == 'ok' and news_data['totalResults'] > 0:
        article = news_data['articles'][0]
        news_list.append({
            'ticker': ticker,
            'company_name': company_name,
            'headline': article['title'],
            'source': article['source']['name'],
            'url': article['url'],
            'publishedAt': article['publishedAt']
        })
    else:
        print(f"No news found for {company_name}")

# Convert the list of news articles to JSON
news_json = json.dumps(news_list, indent=4)

# Print the JSON result
print(news_json)
