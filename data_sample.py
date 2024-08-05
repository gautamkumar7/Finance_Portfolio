import time
from datetime import datetime
import pandas as pd
import yfinance as yf

dt = datetime(2023, 1, 1)
start_date = int(round(dt.timestamp()))

dt = datetime(2023, 3, 31)
end_date = int(round(dt.timestamp()))

stock = 'GOOG'
#
# df = pd.read_csv(f"https://query1.finance.yahoo.com/v7/finance/download/{stock}?period1={start_date}&period2={end_date}&interval=1d&events=history&includeAdjustedClose=true",
#     parse_dates = ['Date'], index_col='Date')

# google = yf.Ticker("MSFT")

goog = yf.download(tickers="GOOGL", start='2023-01-01',end='2023-08-01', progress =False)

print(goog)
