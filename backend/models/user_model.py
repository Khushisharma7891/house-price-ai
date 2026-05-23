from config import users_collection, predictions_collection
import bcrypt
from datetime import datetime

# ── USER FUNCTIONS ──────────────────────────────────────

def create_user(name, email, password):
    # Check if user already exists
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return {"success": False, "message": "Email already registered!"}

    # Encrypting password before saving
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Creating user document
    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now()
    }

    # Saving to MongoDB
    users_collection.insert_one(user)
    return {"success": True, "message": "Account created successfully!"}


def login_user(email, password):
    # Finding user by email
    user = users_collection.find_one({"email": email})
    if not user:
        return {"success": False, "message": "Email not found!"}

    # Checking password
    if bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return {
            "success": True,
            "message": "Login successful!",
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    else:
        return {"success": False, "message": "Wrong password!"}


# ── PREDICTION FUNCTIONS ─────────────────────────────────

def save_prediction(user_id, input_data, predicted_price):
    prediction = {
        "user_id": user_id,
        "input_data": input_data,
        "predicted_price": predicted_price,
        "created_at": datetime.now()
    }
    predictions_collection.insert_one(prediction)
    return {"success": True, "message": "Prediction saved!"}


def get_user_predictions(user_id):
    predictions = list(predictions_collection.find(
        {"user_id": user_id}
    ).sort("created_at", -1).limit(10))

    # Converting to JSON friendly format
    for p in predictions:
        p["_id"] = str(p["_id"])
        p["created_at"] = p["created_at"].strftime("%d %b %Y, %I:%M %p")

    return predictions
