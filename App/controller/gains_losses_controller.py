from flask import Blueprint, jsonify
from services.gains_losses_service import GainsLossesService

gains_losses_bp = Blueprint('gains_losses', __name__)

@gains_losses_bp.route('/gl', methods=['GET'])
def get_gains_losses():
    gains_losses = GainsLossesService.get_combined_gains_losses()
    if gains_losses:
        return jsonify(gains_losses), 200
    else:
        return jsonify({'error': 'No data found'}), 404
