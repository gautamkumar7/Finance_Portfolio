from flask import Blueprint, request, jsonify
from services.transaction_service import TransactionService

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
def get_all_transactions():
    transactions = TransactionService.get_all_transactions()
    return jsonify([transaction.__dict__ for transaction in transactions]), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    transaction = TransactionService.get_transaction_by_id(transaction_id)
    if transaction:
        return jsonify(transaction.__dict__), 200
    else:
        return jsonify({'error': 'Transaction not found'}), 404

@transaction_bp.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    transaction = TransactionService.add_transaction(
        action=data['action'],
        date=data['date'],
        type=data['type'],
        quantity=data['quantity'],
        price=data['price'],
        total_value=data['total_value'],
        entity_name=data['entity_name']  # Add this line
    )
    return jsonify(transaction.__dict__), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    data = request.json
    transaction = TransactionService.update_transaction(transaction_id, **data)
    return jsonify(transaction.__dict__), 200

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    TransactionService.delete_transaction(transaction_id)
    return '', 204
