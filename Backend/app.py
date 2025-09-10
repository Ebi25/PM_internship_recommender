import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import get_recommendations

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Allow frontend JS to access this API

# Load internship data
current_directory = os.path.dirname(os.path.abspath(__file__))
data_file_path = os.path.join(current_directory, "../Data/internship.csv")

try:
    internships_df = pd.read_csv(data_file_path)
except FileNotFoundError as e:
    print(f"Error: Could not find {data_file_path}")
    internships_df = pd.DataFrame()

@app.route("/recommend", methods=["POST"])
def recommend():
    """Receives user data and returns a list of recommended internships."""
    data = request.get_json()

    education = data.get("education")
    skills = data.get("skills", [])
    sector = data.get("sector")
    location = data.get("location")

    recommendations = get_recommendations(
        internships_df, education, skills, sector, location
    )

    return jsonify(recommendations)

# (Optional) health check endpoint
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend running OK"}), 200

if __name__ == "__main__":
    app.run(debug=True)
