from flask import Blueprint, jsonify
from services.portfolio_service import PortfolioService
from flasgger import swag_from

portfolio_bp = Blueprint('portfolio', __name__)

@portfolio_bp.route('/networth', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Get the net worth of the latest portfolio',
            'examples': {
                'application/json': {
                    'date': '2024-08-09',
                    'networth': 1000000.00
                }
            }
        },
        404: {
            'description': 'No portfolio data found',
            'examples': {
                'application/json': {'error': 'No portfolio data found'}
            }
        }
    }
})
def get_networth():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'networth': round(portfolio.net_worth, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404

@portfolio_bp.route('/stocks/current', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Get the current value of stocks in the latest portfolio',
            'examples': {
                'application/json': {
                    'date': '2024-08-09',
                    'stocks_current': 500000.00
                }
            }
        },
        404: {
            'description': 'No portfolio data found',
            'examples': {
                'application/json': {'error': 'No portfolio data found'}
            }
        }
    }
})
def get_stocks_current_value():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'stocks_current': round(portfolio.stocks_current_value, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404

@portfolio_bp.route('/stocks/average', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Get the average buying price of stocks in the latest portfolio',
            'examples': {
                'application/json': {
                    'date': '2024-08-09',
                    'stocks_avg_buy': 150.00
                }
            }
        },
        404: {
            'description': 'No portfolio data found',
            'examples': {
                'application/json': {'error': 'No portfolio data found'}
            }
        }
    }
})
def get_stocks_average_buy():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'stocks_avg_buy': round(portfolio.stocks_avg_buy, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404
