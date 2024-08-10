from flask import Blueprint, jsonify
from services.market_service import MarketService

# Create a Blueprint for market data
market_bp = Blueprint('market', __name__)

# Instantiate the service
market_service = MarketService()


@market_bp.route('/markets', methods=['GET'])
def get_market_changes():
    """Fetches percentage changes for various markets.
    ---
    responses:
      200:
        description: A list of market names with their percentage changes
        schema:
          type: array
          items:
            type: object
            properties:
              market_name:
                type: string
                description: The name of the market
              percentage_change:
                type: number
                description: The percentage change of the market
    """
    market_changes = market_service.get_market_changes()
    return jsonify(market_changes)
