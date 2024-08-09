from model.portfolio import Portfolio
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.db import supabase
from typing import Optional, List


class PortfolioService:
    @staticmethod
    def get_latest_portfolio() -> Optional[Portfolio]:
        response = supabase.table("portfolio").select("*").order('date', desc=True).limit(1).execute()
        if response.data:
            portfolio_data = response.data[0]
            return Portfolio(
                date=portfolio_data['date'],
                cash=portfolio_data['cash'],
                stocks_invested=portfolio_data['stocks_invested'],
                stocks_current=portfolio_data['stocks_current'],
                bonds_invested=portfolio_data['bonds_invested'],
                bonds_current=portfolio_data['bonds_current']
            )
        return None

    @staticmethod
    def get_all_portfolios() -> Optional[List[Portfolio]]:
        response = supabase.table("portfolio").select("*").order('date', desc=True).execute()
        if response.data:
            portfolios = []
            for portfolio_data in response.data:
                portfolios.append(Portfolio(
                    date=portfolio_data['date'],
                    cash=portfolio_data['cash'],
                    stocks_invested=portfolio_data['stocks_invested'],
                    stocks_current=portfolio_data['stocks_current'],
                    bonds_invested=portfolio_data['bonds_invested'],
                    bonds_current=portfolio_data['bonds_current']
                ))
            return portfolios
        return None