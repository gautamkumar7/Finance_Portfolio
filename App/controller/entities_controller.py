from flask import Blueprint, request, jsonify
from services.entities_service import EntityService
from flasgger import swag_from

entities_bp = Blueprint('entities', __name__)

@entities_bp.route('/entities', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'List of all entities',
            'examples': {
                'application/json': [
                    {
                        'entity_id': 1,
                        'type': 'Stock',
                        'name': 'Apple',
                        'quantity': 50,
                        'avg_buy_price': 120.50,
                        'current_price': 145.30,
                        'sector': 'Technology'
                    }
                ]
            }
        }
    }
})
def get_all_entities():
    entities = EntityService.get_all_entities()
    return jsonify([entity.__dict__ for entity in entities]), 200

@entities_bp.route('/entities/<int:entity_id>', methods=['GET'])
@swag_from({
    'parameters': [
        {
            'name': 'entity_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the entity to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Details of the entity',
            'examples': {
                'application/json': {
                    'entity_id': 1,
                    'type': 'Stock',
                    'name': 'Apple',
                    'quantity': 50,
                    'avg_buy_price': 120.50,
                    'current_price': 145.30,
                    'sector': 'Technology'
                }
            }
        },
        404: {
            'description': 'Entity not found',
            'examples': {
                'application/json': {'error': 'Entity not found'}
            }
        }
    }
})
def get_entity(entity_id):
    entity = EntityService.get_entity_by_id(entity_id)
    if entity:
        return jsonify(entity.__dict__), 200
    else:
        return jsonify({'error': 'Entity not found'}), 404


@entities_bp.route('/entities/sector/<string:sector>', methods=['GET'])
@swag_from({
    'parameters': [
        {
            'name': 'sector',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Sector to filter entities by'
        }
    ],
    'responses': {
        200: {
            'description': 'List of entities in the specified sector',
            'examples': {
                'application/json': [
                    {
                        'entity_id': 1,
                        'type': 'Stock',
                        'name': 'Apple',
                        'quantity': 50,
                        'avg_buy_price': 120.50,
                        'current_price': 145.30,
                        'sector': 'Technology'
                    }
                ]
            }
        },
        404: {
            'description': 'No entities found for the specified sector',
            'examples': {
                'application/json': {'error': 'No entities found for the specified sector'}
            }
        }
    }
})
def get_entities_by_sector(sector):
    entities = EntityService.get_entities_by_sector(sector)
    if entities:
        return jsonify(entities), 200
    else:
        return jsonify({'error': 'No entities found for the specified sector'}), 404

@entities_bp.route('/entities/type/<string:entity_type>', methods=['GET'])
@swag_from({
    'parameters': [
        {
            'name': 'entity_type',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'Type to filter entities by'
        }
    ],
    'responses': {
        200: {
            'description': 'List of entities of the specified type',
            'examples': {
                'application/json': [
                    {
                        'entity_id': 1,
                        'type': 'Stock',
                        'name': 'Apple',
                        'quantity': 50,
                        'avg_buy_price': 120.50,
                        'current_price': 145.30,
                        'sector': 'Technology'
                    }
                ]
            }
        },
        404: {
            'description': 'No entities found for the specified type',
            'examples': {
                'application/json': {'error': 'No entities found for the specified type'}
            }
        }
    }
})
def get_entities_by_type(entity_type):
    entities = EntityService.get_entities_by_type(entity_type)
    if entities:
        return jsonify(entities), 200
    else:
        return jsonify({'error': 'No entities found for the specified type'}), 404


@entities_bp.route('/entities/buy', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'quantity': {'type': 'integer'},
                    'price': {'type': 'number'}
                },
                'required': ['name', 'quantity', 'price']
            },
            'description': 'Data for buying an entity'
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully bought the entity',
            'examples': {
                'application/json': {'message': 'Entity bought successfully'}
            }
        },
        400: {
            'description': 'Invalid data provided',
            'examples': {
                'application/json': {'error': 'Name, quantity, and price are required'}
            }
        }
    }
})
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
@swag_from({
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'quantity': {'type': 'integer'},
                    'sell_price': {'type': 'number'}
                },
                'required': ['name', 'quantity', 'sell_price']
            },
            'description': 'Data for selling an entity'
        }
    ],
    'responses': {
        200: {
            'description': 'Successfully sold the entity',
            'examples': {
                'application/json': {'message': 'Entity sold successfully'}
            }
        },
        400: {
            'description': 'Invalid data provided',
            'examples': {
                'application/json': {'error': 'Missing required parameters'}
            }
        }
    }
})
def sell_entity():
    data = request.json
    name = data.get('name')
    quantity = data.get('quantity')
    sell_price = data.get('sell_price')

    if not name or not quantity or not sell_price:
        return jsonify({'error': 'Missing required parameters'}), 400

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
