import pymongo
import os

# Your MongoDB connection string
MONGO_URI = "mongodb+srv://Khushi:house123@cluster0.xgpobpa.mongodb.net/?appName=Cluster0"

# Database name
DATABASE_NAME = "house_price_db"

# Connecting to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]
predictions_collection = db["predictions"]

print("MongoDB connected successfully!")