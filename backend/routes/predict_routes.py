from flask import Blueprint, request, jsonify
import pickle
import numpy as np
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.user_model import save_prediction

predict_bp = Blueprint('predict', __name__)

# Loading ML model and scaler
model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'random_forest_model.pkl')
scaler_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'scaler.pkl')

model = pickle.load(open(model_path, 'rb'))
scaler = pickle.load(open(scaler_path, 'rb'))

# ── PREDICTION ROUTE ─────────────────────────────────────
@predict_bp.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Getting all input values
        longitude = float(data['longitude'])
        latitude = float(data['latitude'])
        housing_median_age = float(data['housing_median_age'])
        total_rooms = float(data['total_rooms'])
        total_bedrooms = float(data['total_bedrooms'])
        population = float(data['population'])
        households = float(data['households'])
        median_income = float(data['median_income'])
        ocean_proximity = data['ocean_proximity']
        user_id = data.get('user_id', 'guest')

        # Ocean proximity encoding
        ocean_1h = 1 if ocean_proximity == '<1H OCEAN' else 0
        ocean_inland = 1 if ocean_proximity == 'INLAND' else 0
        ocean_island = 1 if ocean_proximity == 'ISLAND' else 0
        ocean_near_bay = 1 if ocean_proximity == 'NEAR BAY' else 0
        ocean_near_ocean = 1 if ocean_proximity == 'NEAR OCEAN' else 0

        # Feature engineering
        rooms_per_household = total_rooms / households
        bedrooms_per_room = total_bedrooms / total_rooms
        population_per_household = population / households

        # Creating input array
        input_data = np.array([[
            longitude, latitude, housing_median_age,
            total_rooms, total_bedrooms, population,
            households, median_income,
            rooms_per_household, bedrooms_per_room,
            population_per_household,
            ocean_1h, ocean_inland, ocean_island,
            ocean_near_bay, ocean_near_ocean
        ]])

        # Scaling input
        input_scaled = scaler.transform(input_data)

        # Making prediction
        prediction = model.predict(input_scaled)[0]
        predicted_price = round(float(prediction), 2)

        # Generating AI explanation
        explanation = generate_explanation(
            median_income, ocean_proximity,
            housing_median_age, rooms_per_household
        )

        # Confidence score
        confidence = round(78.50 - abs(predicted_price - 200000) / 10000, 2)
        confidence = max(60, min(95, confidence))

        # Saving prediction to MongoDB
        input_record = {
            "longitude": longitude,
            "latitude": latitude,
            "housing_median_age": housing_median_age,
            "total_rooms": total_rooms,
            "total_bedrooms": total_bedrooms,
            "population": population,
            "households": households,
            "median_income": median_income,
            "ocean_proximity": ocean_proximity
        }
        save_prediction(user_id, input_record, predicted_price)

        return jsonify({
            "success": True,
            "predicted_price": predicted_price,
            "formatted_price": f"${predicted_price:,.2f}",
            "confidence": confidence,
            "explanation": explanation
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ── AI EXPLANATION GENERATOR ─────────────────────────────
def generate_explanation(income, ocean, age, rooms):
    reasons = []

    if income > 6:
        reasons.append("high income neighborhood")
    elif income > 3:
        reasons.append("moderate income neighborhood")
    else:
        reasons.append("lower income neighborhood")

    if ocean in ['<1H OCEAN', 'NEAR BAY', 'NEAR OCEAN']:
        reasons.append("premium coastal location")
    elif ocean == 'ISLAND':
        reasons.append("rare island location")
    else:
        reasons.append("inland location")

    if age < 15:
        reasons.append("newer construction")
    elif age > 35:
        reasons.append("older property")
    else:
        reasons.append("mid-age property")

    if rooms > 6:
        reasons.append("spacious rooms per household")
    else:
        reasons.append("compact room layout")

    explanation = f"Price is influenced by {reasons[0]}, {reasons[1]}, {reasons[2]}, and {reasons[3]}."
    return explanation