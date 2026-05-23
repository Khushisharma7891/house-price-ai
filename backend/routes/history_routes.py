from flask import Blueprint, request, jsonify
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.user_model import get_user_predictions

history_bp = Blueprint('history', __name__)

# ── GET PREDICTION HISTORY ───────────────────────────────
@history_bp.route('/api/history/<user_id>', methods=['GET'])
def get_history(user_id):
    try:
        predictions = get_user_predictions(user_id)
        return jsonify({
            "success": True,
            "predictions": predictions,
            "total": len(predictions)
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500