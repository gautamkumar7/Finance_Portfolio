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

    def get_stock_price(self, ticker):
        stock = yf.Ticker(ticker)
        try:
            current_price = stock.history(period='1d')['Close'].iloc[-1]
        except IndexError:
            current_price = None
        return current_price

    def search_all_stocks(self):
        results = []
        for stock_name, ticker in self.known_tickers.items():
            stock = yf.Ticker(ticker)
            current_price = self.get_stock_price(ticker)
            previous_price = None
            try:
                history = stock.history(period='5d')
                previous_price = history['Close'].iloc[-2]
            except IndexError:
                previous_price = None
            results.append(Stock(stock_name, ticker, current_price, previous_price).to_dict())
        return results
