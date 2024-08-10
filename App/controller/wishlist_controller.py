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
        'current_price': item.current_price,
        'previous_price': item.previous_price  # Include previous_price
    } for item in wishlist_items]), 200

@wishlist_bp.route('/wishlist/all', methods=['GET'])
def get_all_wishlists():
    wishlist_items = WishlistService.get_all_wishlists()
    return jsonify([{
        'number': item.number,
        'stock_name': item.stock_name,
        'current_price': item.current_price,
        'previous_price': item.previous_price  # Include previous_price
    } for item in wishlist_items]), 200

@wishlist_bp.route('/wishlist', methods=['POST'])
def add_to_wishlist():
    data = request.get_json()
    number = data.get('number')
    stock_name = data.get('stock_name')
    current_price = data.get('current_price')
    previous_price = data.get('previous_price', 0.0)  # Default to 0.0 if not provided

    if number not in [1, 2] or not stock_name or current_price is None:
        return jsonify({'error': 'Invalid input data'}), 400

    success = WishlistService.add_to_wishlist(number, stock_name, current_price, previous_price)
    if success:
        return jsonify({'message': 'Item added to wishlist successfully'}), 201
    else:
        return jsonify({'error': 'Failed to add item to wishlist'}), 500

@wishlist_bp.route('/wishlist', methods=['DELETE'])
def delete_from_wishlist():
    data = request.get_json()
    number = data.get('number')

    success = WishlistService.delete_from_wishlist(number)
    if success:
        return jsonify({'message': f'Item with stock_number {number} removed from wishlist successfully'}), 200
    else:
        return jsonify({'error': 'Failed to remove item from wishlist'}), 500
