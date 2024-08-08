from supabase import create_client, Client
import os
from dotenv import load_dotenv
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
    def buy_entity(name, quantity, price):
        response = supabase.table('entities').select('*').eq('name', name).execute()

        if response.data:
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
            return False, 'Entity not found.'

    @staticmethod
    def sell_entity(name, quantity):
        response = supabase.table('entities').select('*').eq('name', name).execute()

        if response.data:
            entity_data = response.data[0]
            entity = Entity(**entity_data)

            if entity.quantity < quantity:
                return False, 'Insufficient quantity available to sell.'

            # Calculate the remaining quantity
            remaining_quantity = entity.quantity - quantity

            # Update only the quantity field
            updates = {
                'quantity': remaining_quantity
            }

            supabase.table('entities').update(updates).eq('entity_id', entity.entity_id).execute()
            return True, 'Entity sold successfully and updated in the database.'
        else:
            return False, 'Entity not found.'