import json
import os

import yfinance as yf
from model.stocks import Stock


class StockService:
    def __init__(self, tickers_file):
        self.tickers_file = os.path.abspath(tickers_file)  # Adjust the path
        self.known_tickers = self.load_tickers()

    def load_tickers(self):
        with open(self.tickers_file, 'r') as file:
            tickers_data = json.load(file)
        return {item['name']: item['ticker'] for item in tickers_data}

    def get_stock_data(self, ticker):
        stock = yf.Ticker(ticker)
        try:
            # Get current price
            history = stock.history(period='1d')
            current_price = history['Close'].iloc[-1]

            # Get previous price
            previous_price = None
            if len(history) > 1:
                previous_price = history['Close'].iloc[-2]
        except IndexError:
            current_price = None
            previous_price = None
        return current_price, previous_price

    def search_stocks(self, query):
        results = []
        for name, ticker in self.known_tickers.items():
            if query.lower() in name.lower():
                current_price, previous_price = self.get_stock_data(ticker)
                results.append(Stock(name, ticker, current_price, previous_price).to_dict())
        return results
