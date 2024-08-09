import yfinance as yf

# Get stock data for a specific company (e.g., Apple)
stock = yf.Ticker("AAPL")
print(stock.news)