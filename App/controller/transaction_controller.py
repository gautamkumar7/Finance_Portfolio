from flask import Blueprint, request, jsonify
from app.services.transaction_services import TransactionService

transaction_controller = Blueprint('transaction_controller', __name__)
service = TransactionService()

@transaction_controller.route('/api/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    transaction_id = service.create_transaction(data)
    return jsonify({'transaction_id': transaction_id}), 201

@transaction_controller.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = service.get_all_transactions()
    return jsonify([transaction.to_dict() for transaction in transactions])

@transaction_controller.route('/api/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    transaction = service.get_transaction_by_id(transaction_id)
    if transaction:
        return jsonify(transaction.to_dict())
    else:
        return jsonify({'error': 'Transaction not found'}), 404

@transaction_controller.route('/api/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    data = request.get_json()
    rows_updated = service.update_transaction(transaction_id, data)
    if rows_updated == 0:
        return jsonify({'error': 'Transaction not found'}), 404
    else:
        return jsonify({'message': 'Transaction updated successfully'})

@transaction_controller.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    rows_deleted = service.delete_transaction(transaction_id)
    if rows_deleted == 0:
        return jsonify({'error': 'Transaction not found'}), 404
    else:
        return jsonify({'message': 'Transaction deleted successfully'})
