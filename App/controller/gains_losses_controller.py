from flask import Blueprint, jsonify
from services.gains_losses_service import GainsLossesService

gains_losses_bp = Blueprint('gains_losses', __name__)

@gains_losses_bp.route('/gains', methods=['GET'])
def get_gains():
    gains = GainsLossesService.get_gains()
    if gains:
        return jsonify([{
            'entity_id': gain.entity_id,
            'type': gain.type,
            'name': gain.name,
            'quantity': gain.quantity,
            'avg_buy_price': gain.avg_buy_price,
            'current_price': gain.current_price,
            'sector': gain.sector
        } for gain in gains]), 200
    else:
        return jsonify({'error': 'No gains found'}), 404

@gains_losses_bp.route('/losses', methods=['GET'])
def get_losses():
    losses = GainsLossesService.get_losses()
    if losses:
        return jsonify([{
            'entity_id': loss.entity_id,
            'type': loss.type,
            'name': loss.name,
            'quantity': loss.quantity,
            'avg_buy_price': loss.avg_buy_price,
            'current_price': loss.current_price,
            'sector': loss.sector
        } for loss in losses]), 200
    else:
        return jsonify({'error': 'No losses found'}), 404
