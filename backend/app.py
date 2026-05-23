from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from routes.history_routes import history_bp

# Creating Flask app
app = Flask(__name__)
CORS(app)

# Registering all routes
app.register_blueprint(auth_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(history_bp)

# Home route to test if backend is running
@app.route('/')
def home():
    return {
        "message": "Smart House Price Prediction API is running!",
        "status": "success",
        "version": "1.0"
    }

if __name__ == '__main__':
    app.run(debug=True, port=5000)