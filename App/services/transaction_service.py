from supabase import create_client, Client
import os
from dotenv import load_dotenv
from model.transaction import Transaction

# Load environment variables from .env file
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class TransactionService:

    @staticmethod
    def get_all_transactions():
        response = supabase.table('transaction').select('*').execute()
        transactions = [Transaction(**t) for t in response.data]
        return transactions

    @staticmethod
    def get_transaction_by_id(transaction_id):
        response = supabase.table('transaction').select('*').eq('id', transaction_id).execute()
        if response.data:
            return Transaction(**response.data[0])
        return None

    @staticmethod
    def add_transaction(action, date, type, quantity, price, total_value, entity_name):  # Add entity_name parameter
        transaction = {
            'action': action,
            'date': date,
            'type': type,
            'quantity': quantity,
            'price': price,
            'total_value': total_value,
            'entity_name': entity_name  # Add this line
        }
        response = supabase.table('transaction').insert(transaction).execute()
        return Transaction(**response.data[0])

    @staticmethod
    def update_transaction(transaction_id, **kwargs):
        response = supabase.table('transaction').update(kwargs).eq('id', transaction_id).execute()
        return Transaction(**response.data[0])

    @staticmethod
    def delete_transaction(transaction_id):
        supabase.table('transaction').delete().eq('id', transaction_id).execute()
