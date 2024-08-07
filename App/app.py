from flask import Flask
from controller.portfolio_controller import portfolio_bp

app = Flask(__name__)
app.register_blueprint(portfolio_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)