from datetime import datetime

from supabase import create_client, Client
import os
from dotenv import load_dotenv
from model.PnL import PnL
from model.entities import Entity

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class EntityService:

    @staticmethod
    def get_all_entities():
        response = supabase.table('entities').select('*').execute()
        entities = [Entity(**e) for e in response.data]
        return entities

    @staticmethod
    def get_entity_by_id(entity_id):
        response = supabase.table('entities').select('*').eq('entity_id', entity_id).execute()
        if response.data:
            return Entity(**response.data[0])
        return None

    @staticmethod
    def get_entities_by_sector(sector):
        response = supabase.table('entities').select('*').eq('sector', sector).execute()
        if response.data:
            return response.data
        return None

    @staticmethod
    def get_entities_by_type(entity_type):
        response = supabase.table('entities').select('*').eq('type', entity_type).execute()
        if response.data:
            return response.data
        return None

    @staticmethod
    def buy_entity(name, quantity, price):
        response = supabase.table('entities').select('*').eq('name', name).execute()

        if response.data:
            # Entity exists, update its quantity and avg_buy_price
            entity_data = response.data[0]
            entity = Entity(**entity_data)

            # Calculate the new total quantity and average buy price
            total_quantity = entity.quantity + quantity
            avg_buy_price = ((entity.quantity * entity.avg_buy_price) + (quantity * price)) / total_quantity

            # Update only the necessary fields
            updates = {
                'quantity': total_quantity,
                'avg_buy_price': avg_buy_price
            }

            supabase.table('entities').update(updates).eq('entity_id', entity.entity_id).execute()
            return True, 'Entity bought successfully and updated in the database.'
        else:
            # Entity doesn't exist, insert it into the database
            new_entity = {
                'name': name,
                'quantity': quantity,
                'avg_buy_price': price,  # First buy, so avg_buy_price is the price itself
                'type': 'Stock',  # Assuming default type, can be parameterized
                'current_price': price,  # Setting current_price as the buy price for now
                'sector': 'Unknown'  # Default sector, can be parameterized or updated later
            }

            supabase.table('entities').insert(new_entity).execute()
            return True, 'Entity created and inserted into the database.'

    @staticmethod
    def sell_entity(name, quantity, sell_price):
        response = supabase.table('entities').select('*').eq('name', name).execute()

        if response.data:
            entity_data = response.data[0]
            entity = Entity(**entity_data)

            if entity.quantity < quantity:
                return False, 'Insufficient quantity available to sell.'

            # Calculate the remaining quantity
            remaining_quantity = entity.quantity - quantity

            # Calculate the realised profit/loss
            realised_pl = (sell_price - entity.avg_buy_price) * quantity

            # Update the quantity field in the entities table
            updates = {
                'quantity': remaining_quantity
            }
            supabase.table('entities').update(updates).eq('entity_id', entity.entity_id).execute()

            # Update realised_pl in the latest row of the P&L table
            EntityService.update_realised_pl(realised_pl)

            return True, 'Entity sold successfully and updated in the database.'
        else:
            return False, 'Entity not found.'

    def update_realised_pl(realised_pl):
        # Capture current date
        current_date = datetime.now().date()  # Use date() for date only

        # Convert date to string (adjust format as needed)
        date_string = current_date.strftime("%Y-%m-%d")

        # Fetch the last row in the P&L table ordered by date
        response = supabase.table('pnl').select('*').order('date', desc=True).limit(1).execute()

        if response.data:
            last_row = response.data[0]
            last_realised_pl = last_row['realised_pl']

            # Calculate new realised pl
            new_realised_pl = last_realised_pl + realised_pl

            # Insert new row with updated realised pl and date as a string
            supabase.table('pnl').insert({'realised_pl': new_realised_pl, 'date': date_string}).execute()
        else:
            # Handle case where there's no row in the table yet (optional)
            # For example, insert the first row with the initial realised_pl
            supabase.table('pnl').insert({'realised_pl': realised_pl, 'date': date_string}).execute()



