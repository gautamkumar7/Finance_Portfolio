from datetime import datetime
from app.repository.transaction_repository import TransactionRepository
from app.model.transaction import Transaction

class TransactionService:
    def __init__(self):
        self.repository = TransactionRepository()

    def create_transaction(self, data):
        transaction_date = data.get('transaction_date', datetime.now())
        total_value = data.get('total_value', data['quantity'] * data['price_per_quantity'])

        transaction = Transaction(
            None,
            data['transaction_type'],
            transaction_date,
            data['quantity'],
            data['price_per_quantity'],
            total_value,
            data['investment_type']
        )
        transaction_id = self.repository.create_transaction(transaction)
        return transaction_id

    def get_all_transactions(self):
        return self.repository.get_all_transactions()

    def get_transaction_by_id(self, transaction_id):
        return self.repository.get_transaction_by_id(transaction_id)

    def update_transaction(self, transaction_id, data):
        transaction_date = data.get('transaction_date', datetime.now())
        total_value = data.get('total_value', data['quantity'] * data['price_per_quantity'])

        print(type(data['price_per_quantity']))

        transaction = Transaction(
            transaction_id,
            data['transaction_type'],
            transaction_date,
            data['quantity'],
            data['price_per_quantity'],
            total_value,
            data['investment_type']
        )
        return self.repository.update_transaction(transaction)

    def delete_transaction(self, transaction_id):
        return self.repository.delete_transaction(transaction_id)
