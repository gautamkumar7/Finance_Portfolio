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

@entities_bp.route('/entities', methods=['POST'])
def add_entity():
    data = request.json
    entity = EntityService.add_entity(
        type=data['type'],
        name=data['name'],
        quantity=data['quantity'],
        avg_buy_price=data['avg_buy_price'],
        current_price=data['current_price'],
        sector=data['sector'],
        transaction_id=data['transaction_id']
    )
    if entity:
        return jsonify(entity.__dict__), 201
    else:
        return jsonify({'error': 'Failed to create entity'}), 400

@entities_bp.route('/entities/<int:entity_id>', methods=['PUT'])
def update_entity(entity_id):
    data = request.json
    entity = EntityService.update_entity(entity_id, **data)
    if entity:
        return jsonify(entity.__dict__), 200
    else:
        return jsonify({'error': 'Entity not found or update failed'}), 404

@entities_bp.route('/entities/<int:entity_id>', methods=['DELETE'])
def delete_entity(entity_id):
    EntityService.delete_entity(entity_id)
    return '', 204
