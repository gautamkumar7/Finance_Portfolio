class Transaction:
    def __init__(self, transaction_type, quantity, price_per_quantity, total_value=0, investment_type='',transaction_date="",transaction_id=""):
        self.transaction_id = transaction_id
        self.transaction_type = transaction_type
        self.transaction_date = transaction_date
        self.quantity = quantity
        self.price_per_quantity = price_per_quantity
        self.total_value = total_value
        self.investment_type = investment_type

    def to_dict(self):
        return {
            'transaction_id': self.transaction_id,
            'transaction_type': self.transaction_type,
            'transaction_date': self.transaction_date,
            'quantity': self.quantity,
            'price_per_quantity': self.price_per_quantity,
            'total_value': self.total_value,
            'investment_type': self.investment_type
        }

    def to_object(self,data):
        return Transaction(**data)
