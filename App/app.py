from flask import Flask
from flasgger import Swagger
from controller.portfolio_controller import portfolio_bp
from controller.wishlist_controller import wishlist_bp
from controller.transaction_controller import transaction_bp  # Import transaction blueprint

app = Flask(__name__)
swagger = Swagger(app)  # Swagger setup

# Register blueprints
app.register_blueprint(portfolio_bp, url_prefix='/api')
app.register_blueprint(wishlist_bp, url_prefix='/api')
app.register_blueprint(transaction_bp, url_prefix='/api')  # Register transaction blueprint

if __name__ == '__main__':
    app.run(debug=True)
