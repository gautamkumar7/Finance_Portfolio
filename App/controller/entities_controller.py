from flask import Blueprint, request, jsonify
from services.entities_service import EntityService

entities_bp = Blueprint('entities', __name__)

@entities_bp.route('/entities', methods=['GET'])
def get_all_entities():
    entities = EntityService.get_all_entities()
    return jsonify([entity.__dict__ for entity in entities]), 200

@entities_bp.route('/entities/<int:entity_id>', methods=['GET'])
def get_entity(entity_id):
    entity = EntityService.get_entity_by_id(entity_id)
    if entity:
        return jsonify(entity.__dict__), 200
    else:
        return jsonify({'error': 'Entity not found'}), 404


@entities_bp.route('/entities/sector/<string:sector>', methods=['GET'])
def get_entities_by_sector(sector):
    entities = EntityService.get_entities_by_sector(sector)
    if entities:
        return jsonify(entities), 200
    else:
        return jsonify({'error': 'No entities found for the specified sector'}), 404


@entities_bp.route('/entities/buy', methods=['POST'])
def buy_entity():
    data = request.get_json()
    name = data.get('name')
    quantity = data.get('quantity')
    price = data.get('price')

    if not name or not quantity or not price:
        return jsonify({'error': 'Name, quantity, and price are required'}), 400

    success, message = EntityService.buy_entity(name, quantity, price)
    if success:
        return jsonify({'message': message}), 200
    else:
        return jsonify({'error': message}), 400


@entities_bp.route('/entities/sell', methods=['POST'])
def sell_entity():
    data = request.json
    name = data.get('name')
    quantity = data.get('quantity')
    sell_price = data.get('sell_price')

    if not name or not quantity or not sell_price:
        return jsonify({'error': 'Missing required parameters'}), 400

    # Ensure quantity and sell_price are valid numbers
    try:
        quantity = int(quantity)
        sell_price = float(sell_price)
    except ValueError:
        return jsonify({'error': 'Invalid quantity or sell_price format'}), 400

    success, message = EntityService.sell_entity(name=name, quantity=quantity, sell_price=sell_price)

    if success:
        return jsonify({'message': message}), 200
    else:
        return jsonify({'error': message}), 400
