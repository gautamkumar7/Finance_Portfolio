from flask import Blueprint, jsonify, request
from services.transaction_service import TransactionService
from flasgger import swag_from

transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/transactions', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Get all transactions',
            'examples': {
                'application/json': [
                    {
                        'transaction_id': 1,
                        'date': '2024-08-09',
                        'entity': 'Apple',
                        'type': 'buy',
                        'quantity': 10,
                        'price': 145.00
                    }
                ]
            }
        }
    }
})
def get_all_transactions():
    transactions = TransactionService.get_all_transactions()
    return jsonify([transaction.__dict__ for transaction in transactions]), 200

@transaction_bp.route('/transactions', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'entity': {'type': 'string'},
                    'type': {'type': 'string'},
                    'quantity': {'type': 'integer'},
                    'price': {'type': 'number'}
                },
                'required': ['entity', 'type', 'quantity', 'price']
            },
            'description': 'Data for creating a new transaction'
        }
    ],
    'responses': {
        201: {
            'description': 'Transaction created successfully',
            'examples': {
                'application/json': {
                    'transaction_id': 1,
                    'date': '2024-08-09',
                    'entity': 'Apple',
                    'type': 'buy',
                    'quantity': 10,
                    'price': 145.00
                }
            }
        },
        400: {
            'description': 'Invalid data provided',
            'examples': {
                'application/json': {'error': 'Invalid input'}
            }
        }
    }
})
def create_transaction():
    data = request.get_json()
    entity = data.get('entity')
    transaction_type = data.get('type')
    quantity = data.get('quantity')
    price = data.get('price')

    if not entity or not transaction_type or not quantity or not price:
        return jsonify({'error': 'Invalid input'}), 400

    transaction = TransactionService.create_transaction(entity, transaction_type, quantity, price)
    return jsonify(transaction.__dict__), 201

@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
@swag_from({
    'parameters': [
        {
            'name': 'transaction_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the transaction to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Transaction deleted successfully',
            'examples': {
                'application/json': {'message': 'Transaction deleted successfully'}
            }
        },
        404: {
            'description': 'Transaction not found',
            'examples': {
                'application/json': {'error': 'Transaction not found'}
            }
        }
    }
})
def delete_transaction(transaction_id):
    success = TransactionService.delete_transaction(transaction_id)
    if success:
        return jsonify({'message': 'Transaction deleted successfully'}), 200
    else:
        return jsonify({'error': 'Transaction not found'}), 404
