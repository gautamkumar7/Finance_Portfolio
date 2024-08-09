from flask import Blueprint, jsonify, request
from services.wishlist_service import WishlistService

wishlist_bp = Blueprint('wishlist', __name__)

@wishlist_bp.route('/wishlist', methods=['GET'])
def get_wishlist():
    number = request.args.get('number', type=int)
    if number is None:
        return jsonify({'error': 'Number parameter is required'}), 400

    wishlist_items = WishlistService.get_wishlist(number)
    return jsonify([{
        'number': item.number,
        'stock_name': item.stock_name,
        'current_price': item.current_price
    } for item in wishlist_items]), 200

@wishlist_bp.route('/wishlist', methods=['POST'])
def add_to_wishlist():
    data = request.get_json()
    number = data.get('number')
    stock_name = data.get('stock_name')
    current_price = data.get('current_price')

    if number not in [1, 2] or not stock_name or current_price is None:
        return jsonify({'error': 'Invalid input data'}), 400

    success = WishlistService.add_to_wishlist(number, stock_name, current_price)
    if success:
        return jsonify({'message': 'Item added to wishlist successfully'}), 201
    else:
        return jsonify({'error': 'Failed to add item to wishlist'}), 500


@wishlist_bp.route('/wishlist', methods=['DELETE'])
def delete_from_wishlist():
    data = request.get_json()
    number = data.get('number')
    stock_name = data.get('stock_name')

    if number not in [1, 2] or not stock_name:
        return jsonify({'error': 'Invalid input data'}), 400

    success = WishlistService.delete_from_wishlist(number, stock_name)
    if success:
        return jsonify({'message': f'Item with stock_name "{stock_name}" removed from wishlist {number} successfully'}), 200
    else:
        return jsonify({'error': 'Failed to remove item from wishlist'}), 500
