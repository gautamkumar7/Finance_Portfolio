from flask import Blueprint, jsonify
from services.news_service import NewsService
import random

news_bp = Blueprint('news_bp', __name__)

# Initialize the NewsService
news_service = NewsService()


@news_bp.route('/news', methods=['GET'])
def get_random_news():
    # Define a list of tickers to choose from
    tickers_list = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA", "NFLX", "NVDA", "JPM", "BAC"]

    # Randomly select up to 9 unique tickers
    selected_tickers = random.sample(tickers_list ,9)

    # Fetch news using the NewsService
    news_list = news_service.get_news_for_tickers(selected_tickers)

    # Return the JSON response
    return jsonify(news_list)


#backup newsAPI code
# # Initialize the NewsService with your API key
# news_service = NewsService(api_key='your_api_key')  # Replace with your actual API key
#
# @news_bp.route('/news', methods=['GET'])
# def get_random_news():
#     # Define a list of tickers to choose from
#     tickers_list = ["AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA", "NFLX", "NVDA", "JPM", "BAC"]
#
#     # Randomly select 10 tickers
#     selected_tickers = random.sample(tickers_list, 10)
#
#     # Fetch news using the NewsService
#     news_list = news_service.get_news_for_tickers(selected_tickers)
#
#     # Return the JSON response
#     return jsonify(news_list)