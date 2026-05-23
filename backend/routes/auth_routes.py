from flask import Blueprint, request, jsonify
import jwt
import datetime
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.user_model import create_user, login_user

# Creating a blueprint for auth routes
auth_bp = Blueprint('auth', __name__)

# Secret key for JWT token
SECRET_KEY = "houseprice_secret_key_2024"

# ── SIGNUP ROUTE ─────────────────────────────────────────
@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        # Checking all fields are filled
        if not name or not email or not password:
            return jsonify({"success": False, "message": "All fields required!"}), 400

        # Creating user
        result = create_user(name, email, password)
        if result["success"]:
            return jsonify(result), 201
        else:
            return jsonify(result), 400

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ── LOGIN ROUTE ──────────────────────────────────────────
@auth_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Checking all fields are filled
        if not email or not password:
            return jsonify({"success": False, "message": "All fields required!"}), 400

        # Logging in user
        result = login_user(email, password)

        if result["success"]:
            # Creating JWT token
            token = jwt.encode({
                "user_id": result["user_id"],
                "email": result["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
            }, SECRET_KEY, algorithm="HS256")

            return jsonify({
                "success": True,
                "message": "Login successful!",
                "token": token,
                "name": result["name"],
                "email": result["email"],
                "user_id": result["user_id"]
            }), 200
        else:
            return jsonify(result), 401

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    