import os

from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

from controller.news_controller import news_bp
from controller.portfolio_controller import portfolio_bp
from controller.wishlist_controller import wishlist_bp
from controller.transaction_controller import transaction_bp
from controller.entities_controller import entities_bp
from controller.market_controller import market_bp
from controller.gains_losses_controller import gains_losses_bp
from controller.stocks_controller import stock_controller

app = Flask(__name__)
swagger = Swagger(app)  # Swagger setup

# Initialize CORS
CORS(app)

# Register blueprints
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(wishlist_bp, url_prefix='/api')
app.register_blueprint(transaction_bp, url_prefix='/api')
app.register_blueprint(entities_bp, url_prefix='/api')
app.register_blueprint(news_bp, url_prefix='/api')
app.register_blueprint(market_bp, url_prefix='/api')
app.register_blueprint(gains_losses_bp, url_prefix='/api')
app.register_blueprint(stock_controller, url_prefix='/api')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port)
