from flask import Blueprint, jsonify, request
from services.wishlist_service import WishlistService
from flasgger import swag_from

wishlist_bp = Blueprint('wishlist', __name__)

@wishlist_bp.route('/wishlist', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Get all items in the wishlist',
            'examples': {
                'application/json': [
                    {
                        'wishlist_id': 1,
                        'item': 'Tesla',
                        'target_price': 500.00
                    }
                ]
            }
        }
    }
})
def get_wishlist():
    wishlist_items = WishlistService.get_all_wishlist_items()
    return jsonify([item.__dict__ for item in wishlist_items]), 200

@wishlist_bp.route('/wishlist', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'item': {'type': 'string'},
                    'target_price': {'type': 'number'}
                },
                'required': ['item', 'target_price']
            },
            'description': 'Data for adding an item to the wishlist'
        }
    ],
    'responses': {
        201: {
            'description': 'Item added to wishlist successfully',
            'examples': {
                'application/json': {
                    'wishlist_id': 1,
                    'item': 'Tesla',
                    'target_price': 500.00
                }
            }
        },
        400: {
            'description': 'Invalid data provided',
            'examples': {
                'application/json': {'error': 'Item and target price are required'}
            }
        }
    }
})
def add_to_wishlist():
    data = request.get_json()
    item = data.get('item')
    target_price = data.get('target_price')

    if not item or not target_price:
        return jsonify({'error': 'Item and target price are required'}), 400

    wishlist_item = WishlistService.add_item_to_wishlist(item, target_price)
    return jsonify(wishlist_item.__dict__), 201

@wishlist_bp.route('/wishlist/<int:wishlist_id>', methods=['DELETE'])
@swag_from({
    'parameters': [
        {
            'name': 'wishlist_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the wishlist item to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Item removed from wishlist successfully',
            'examples': {
                'application/json': {'message': 'Wishlist item deleted successfully'}
            }
        },
        404: {
            'description': 'Wishlist item not found',
            'examples': {
                'application/json': {'error': 'Wishlist item not found'}
            }
        }
    }
})
def remove_from_wishlist(wishlist_id):
    success = WishlistService.remove_item_from_wishlist(wishlist_id)
    if success:
        return jsonify({'message': 'Wishlist item deleted successfully'}), 200
    else:
        return jsonify({'error': 'Wishlist item not found'}), 404
