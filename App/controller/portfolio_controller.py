from flask import Blueprint, jsonify
from services.portfolio_service import PortfolioService

portfolio_bp = Blueprint('portfolio', __name__)


@portfolio_bp.route('/networth', methods=['GET'])
def get_networth():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'networth': round(portfolio.net_worth, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404
