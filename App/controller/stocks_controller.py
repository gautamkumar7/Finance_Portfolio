from flask import Blueprint, request, jsonify
from services.stocks_service import StockService
import os

# Create a Blueprint for the stock controller
stock_controller = Blueprint('stock_controller', __name__)

# Determine the absolute path to the tickers.json file
base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the directory of this file
tickers_file_path = os.path.join(base_dir, '../tickers.json')  # Adjust path to point to tickers.json

# Initialize StockService with the absolute path to tickers.json
stock_service = StockService(tickers_file_path)

@stock_controller.route('/search', methods=['GET'])
def search_stocks():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "No query provided"}), 400

    results = stock_service.search_stocks(query)
    return jsonify(results)
