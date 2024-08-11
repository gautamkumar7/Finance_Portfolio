class Stock:
    def __init__(self, name, ticker, current_price, previous_price=None):
        self.stock_name = name
        self.ticker = ticker
        self.current_price = current_price
        self.previous_price = previous_price  # Add previous price

    def to_dict(self):
        return {
            'stock_name': self.stock_name,
            'ticker': self.ticker,
            'current_price': self.current_price,
            'previous_price': self.previous_price  # Include previous price
        }
