from datetime import datetime

from model.portfolio import Portfolio
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.db import supabase
from typing import Optional, List


class PortfolioService:
    @staticmethod
    def get_latest_portfolio() -> Optional[Portfolio]:
        response = supabase.table("portfolio").select("*").order('id', desc=True).limit(1).execute()
        if response.data:
            portfolio_data = response.data[0]
            return Portfolio(
                id=portfolio_data['id'],
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
        response = supabase.table("portfolio").select("*").order('id', desc=True).execute()
        if response.data:
            portfolios = []
            for portfolio_data in response.data:
                portfolios.append(Portfolio(
                    id=portfolio_data['id'],
                    date=portfolio_data['date'],
                    cash=portfolio_data['cash'],
                    stocks_invested=portfolio_data['stocks_invested'],
                    stocks_current=portfolio_data['stocks_current'],
                    bonds_invested=portfolio_data['bonds_invested'],
                    bonds_current=portfolio_data['bonds_current']
                ))
            return portfolios
        return None


    @staticmethod
    def update_cash_in_portfolio(new_cash_amount):
        # Fetch the last row in the portfolio table ordered by id
        response = supabase.table('portfolio').select('*').order('id', desc=True).limit(1).execute()

        if response.data:
            last_row = response.data[0]

            # Calculate the new cash value by adding the new cash amount to the last row's cash value
            updated_cash = last_row['cash'] + new_cash_amount

            # Prepare the updated row with the new cash value and the current date
            updated_row = {
                'date': datetime.now().strftime("%Y-%m-%d"),  # Convert date to string format "YYYY-MM-DD"
                'cash': updated_cash,
                'stocks_invested': last_row['stocks_invested'],
                'stocks_current': last_row['stocks_current'],
                'bonds_invested': last_row['bonds_invested'],
                'bonds_current': last_row['bonds_current']
            }

            # Insert the updated row into the portfolio table
            supabase.table('portfolio').insert(updated_row).execute()
            return True, 'Cash updated and new row inserted'
        else:
            return False, 'Portfolio table is empty, unable to update cash.'
