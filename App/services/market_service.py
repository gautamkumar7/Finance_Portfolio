# service/market_service.py

import yfinance as yf

class MarketService:
    def __init__(self):
        # Define the ticker symbols for the indices
        self.indices = {
            "S&P 500": "^GSPC",
            "NASDAQ": "^IXIC",
            "Dow Jones": "^DJI",
            "FTSE 100": "^FTSE"
        }

    def get_market_changes(self):
        market_changes = []
        for market_name, ticker in self.indices.items():
            stock = yf.Ticker(ticker)
            hist = stock.history(period="1d")  # Fetching the data for the last day

            if not hist.empty:
                percentage_change = (hist['Close'].iloc[-1] - hist['Open'].iloc[-1]) / hist['Open'].iloc[-1] * 100
                market_changes.append({
                    "market_name": market_name,
                    "percentage_change": round(percentage_change, 2)
                })

        return market_changes
