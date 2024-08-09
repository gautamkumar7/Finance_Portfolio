from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from controller.portfolio_controller import portfolio_bp
from controller.wishlist_controller import wishlist_bp
from controller.transaction_controller import transaction_bp
from controller.entities_controller import entities_bp

app = Flask(__name__)
swagger = Swagger(app)  # Swagger setup
# Initialize CORS
CORS(app)

# Register blueprints
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(wishlist_bp, url_prefix='/api')
app.register_blueprint(transaction_bp, url_prefix='/api')
app.register_blueprint(entities_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)