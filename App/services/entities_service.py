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
    def add_entity(type, name, quantity, avg_buy_price, current_price, sector, transaction_id):
        entity = {
            'type': type,
            'name': name,
            'quantity': quantity,
            'avg_buy_price': avg_buy_price,
            'current_price': current_price,
            'sector': sector,
            'transaction_id': transaction_id
        }
        response = supabase.table('entities').insert(entity).execute()
        if response.data:
            return Entity(**response.data[0])
        return None

    @staticmethod
    def update_entity(entity_id, **kwargs):
        response = supabase.table('entities').update(kwargs).eq('entity_id', entity_id).execute()
        if response.data:
            return Entity(**response.data[0])
        return None

    @staticmethod
    def delete_entity(entity_id):
        supabase.table('entities').delete().eq('entity_id', entity_id).execute()
