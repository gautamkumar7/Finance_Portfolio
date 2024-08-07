import mysql.connector
from app.config import Config
from app.model.transaction import Transaction

class TransactionRepository:
    def __init__(self):
        self.conn = mysql.connector.connect(
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            host=Config.MYSQL_HOST,
            database=Config.MYSQL_DB
        )
        self.cursor = self.conn.cursor(dictionary=True)

    def create_transaction(self, transaction):
        query = "INSERT INTO transactions (transaction_type, transaction_date, quantity, price_per_quantity, total_value, investment_type) VALUES (%s, %s, %d %f, %f, %s)"
        self.cursor.execute(query, (transaction.transaction_type, transaction.transaction_date, transaction.quantity, transaction.price_per_quantity, transaction.total_value, transaction.investment_type))
        self.conn.commit()
        return self.cursor.lastrowid

    def get_all_transactions(self):
        self.cursor.execute("SELECT * FROM transactions")
        transactions = self.cursor.fetchall()
        return [Transaction(**transaction) for transaction in transactions]

    def get_transaction_by_id(self, transaction_id):
        self.cursor.execute("SELECT * FROM transactions WHERE transaction_id = %s", (transaction_id,))
        transaction = self.cursor.fetchone()
        return Transaction(**transaction) if transaction else None

    def update_transaction(self, transaction):
        query = "UPDATE transactions SET transaction_type = %s, transaction_date = %s, quantity = %s, price_per_quantity = %s, total_value = %s, investment_type = %s WHERE transaction_id = %s"
        self.cursor.execute(query, (transaction.transaction_type, transaction.transaction_date, transaction.quantity, transaction.price_per_quantity, transaction.total_value, transaction.investment_type, transaction.transaction_id))
        self.conn.commit()
        return self.cursor.rowcount

    def delete_transaction(self, transaction_id):
        self.cursor.execute("DELETE FROM transactions WHERE transaction_id = %s", (transaction_id,))
        self.conn.commit()
        return self.cursor.rowcount
