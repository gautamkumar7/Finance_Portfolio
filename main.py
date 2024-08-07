# from app import create_app, db
#
# app = create_app()
#
# with app.app_context():
#     db.create_all()
#
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask
from app.controller.transaction_controller import transaction_controller

app = Flask(__name__)

# Register the blueprint
app.register_blueprint(transaction_controller)

if __name__ == '__main__':
    app.run(debug=True)
