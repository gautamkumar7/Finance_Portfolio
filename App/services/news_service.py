import random
import requests
import yfinance as yf


class NewsService:
    def __init__(self, api_key):
        self.news_api_url = 'https://newsapi.org/v2/everything'
        self.api_key = 'b456584eff374267964f3b17d0b09038'

    def get_news_for_tickers(self, tickers):
        news_list = []

        for ticker in tickers:
            stock = yf.Ticker(ticker)

            # Get the company's name from yfinance
            company_name = stock.info.get('shortName', ticker)

            # Parameters for the news API request
            params = {
                'q': company_name,  # Search query is the company name
                'apiKey': self.api_key,
                'language': 'en',
                'sortBy': 'publishedAt',
                'pageSize': 1  # Get only one article
            }

            # Make the request to the News API
            response = requests.get(self.news_api_url, params=params)

            # Parse the response as JSON
            news_data = response.json()

            # Check if articles are found
            if news_data['status'] == 'ok' and news_data['totalResults'] > 0:
                article = news_data['articles'][0]

                # Create a 10-word summary from the article's description
                description = article.get('description', '')
                summary = ' '.join(description.split()[:10]) if description else 'No summary available'

                news_list.append({
                    'stock_name': company_name,
                    'headline': article['title'],
                    'news_url': article['url'],
                    'image_url': article.get('urlToImage', 'No image available'),
                    'summary': summary,
                    'source': article['source']['name']
                })
            else:
                print(f"No news found for {company_name}")

        return news_list
