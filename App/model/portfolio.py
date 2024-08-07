from dataclasses import dataclass


@dataclass
class Portfolio:
    date: str
    cash: float
    stocks_invested: float
    stocks_current: float
    bonds_invested: float
    bonds_current: float

    @property
    def net_worth(self):
        return self.cash + self.stocks_current + self.bonds_current
