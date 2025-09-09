import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import get_recommendations

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS for the application
CORS(app)  # Allow frontend JS to access this API

# Construct a robust, absolute path to the data file.
# This ensures the application can find the file regardless of the working directory.
try:
    current_directory = os.path.dirname(os.path.abspath(__file__))
    data_file_path = os.path.join(current_directory, "../Data/internship.csv")
    internships_df = pd.read_csv(data_file_path)
except FileNotFoundError as e:
    # Handle the case where the file is not found
    print(f"Error: The file could not be found at {data_file_path}")
    print(f"Please ensure the path is correct relative to the app.py file.")
    print(f"Details: {e}")
    internships_df = pd.DataFrame() # Create an empty DataFrame to prevent the app from crashing

@app.route("/recommend", methods=["POST"])
def recommend():
    """
    Receives user data and returns a list of recommended internships.
    """