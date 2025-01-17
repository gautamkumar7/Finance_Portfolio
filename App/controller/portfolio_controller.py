from flask import Blueprint, jsonify, request
from services.portfolio_service import PortfolioService

portfolio_bp = Blueprint('portfolio', __name__)


@portfolio_bp.route('/networth', methods=['GET'])  #tested
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
def get_stocks_current():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'stocks_current': round(portfolio.stocks_current, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404


@portfolio_bp.route('/stocks/invested', methods=['GET'])
def get_stocks_invested():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'stocks_invested': round(portfolio.stocks_invested, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404


@portfolio_bp.route('/bonds/current', methods=['GET'])
def get_bonds_current():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'bonds_current': round(portfolio.bonds_current, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404


@portfolio_bp.route('/bonds/invested', methods=['GET'])
def get_bonds_invested():
    portfolio = PortfolioService.get_latest_portfolio()
    if portfolio:
        return jsonify({
            'date': portfolio.date,
            'bonds_invested': round(portfolio.bonds_invested, 2)
        }), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404


@portfolio_bp.route('/portfolio', methods=['GET'])
def get_all_portfolios():
    portfolios = PortfolioService.get_all_portfolios()
    if portfolios:
        return jsonify([{
            'date': portfolio.date,
            'cash': round(portfolio.cash, 2),
            'stocks_invested': round(portfolio.stocks_invested, 2),
            'stocks_current': round(portfolio.stocks_current, 2),
            'bonds_invested': round(portfolio.bonds_invested, 2),
            'bonds_current': round(portfolio.bonds_current, 2),
            'net_worth': round(portfolio.net_worth, 2)
        } for portfolio in portfolios]), 200
    else:
        return jsonify({'error': 'No portfolio data found'}), 404

@portfolio_bp.route('/addcash', methods=['POST'])
def update_cash_in_portfolio():
    data = request.get_json()
    new_cash_amount = data.get('cash')

    if not new_cash_amount:
        return jsonify({'error': 'Cash amount is required'}), 400

    try:
        new_cash_amount = float(new_cash_amount)
    except ValueError:
        return jsonify({'error': 'Invalid cash amount format'}), 400

    success, message = PortfolioService.update_cash_in_portfolio(new_cash_amount)

    if success:
        return jsonify({'message': message}), 200
    else:
        return jsonify({'error': message}), 400
