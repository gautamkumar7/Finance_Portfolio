# controller/wishlist_controller.py

from flask import Blueprint, jsonify, request

from services.wishlist_service import WishlistService  # Import the WishlistService

wishlist_bp = Blueprint('wishlist', __name__)


@wishlist_bp.route('/wishlist', methods=['GET'])
def get_wishlist():
    number = request.args.get('number', type=int)
    if number not in [1, 2]:
        return jsonify({'error': 'Invalid number parameter'}), 400

    wishlist = WishlistService.get_wishlist(number)
    if wishlist:
        return jsonify([{
            'id': item.id,
            'stock_name': item.stock_name,
            'current_price': round(item.current_price, 2)
        } for item in wishlist]), 200
    else:
        return jsonify({'error': 'No wishlist data found'}), 404
