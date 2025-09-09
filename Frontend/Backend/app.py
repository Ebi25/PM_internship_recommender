from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from Frontend.Backend.recommend import get_recommendations

app = Flask(__name__)
CORS(app)  # allow frontend JS to access this API

# Load internship data once
internships_df = pd.read_csv("../Data/internship.csv")


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    education = data.get("education")
    skills = data.get("skills", [])
    sector = data.get("sector")
    location = data.get("location")

    recommendations = get_recommendations(
        internships_df, education, skills, sector, location
    )

    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
