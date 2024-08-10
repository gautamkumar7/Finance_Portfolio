from flask import Blueprint, jsonify
from services.gains_losses_service import GainsLossesService

gains_losses_bp = Blueprint('gains_losses', __name__)

@gains_losses_bp.route('/gains', methods=['GET'])
def get_gains():
    gains = GainsLossesService.get_gains()
    if gains:
        return jsonify(gains), 200
    else:
        return jsonify({'error': 'No gains found'}), 404

@gains_losses_bp.route('/losses', methods=['GET'])
def get_losses():
    losses = GainsLossesService.get_losses()
    if losses:
        return jsonify(losses), 200
    else:
        return jsonify({'error': 'No losses found'}), 404
