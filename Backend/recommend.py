
import pandas as pd

def get_recommendations(df, education, skills, sector, location, top_n=5):
    """
    Analyzes a DataFrame of internships and returns a list of ranked recommendations
    based on a user's education, skills, sector, and location preferences.

    Args:
        df (pd.DataFrame): The DataFrame containing internship data.
        education (str): The user's education level.
        skills (list): A list of the user's skills.
        sector (str): The user's preferred sector.
        location (str): The user's preferred location.
        top_n (int): The number of top recommendations to return.

    Returns:
        list: A list of dictionaries, each representing a recommended internship
              and its match details.
    """
    # Check if the DataFrame is empty to prevent errors
    if df.empty:
        print("Warning: The internship DataFrame is empty. No recommendations can be generated.")
        return []

    results = []

    # Iterate through each row of the DataFrame to calculate a relevance score
    for _, row in df.iterrows():
        score = 0
        reasons = []

        # Match education
        if education and (row["Education"] == education or row["Education"] == "Any Graduate"):
            score += 2
            reasons.append(f"Education match ({education})")

        # Match sector
        if sector and row["Sector"] == sector:
            score += 2
            reasons.append(f"Sector interest ({sector})")

        # Match location
        if location and (row["Location"] == location or row["Location"] == "Remote"):
            score += 2
            reasons.append(f"Preferred location ({location})")

        # Match skills - using a more robust approach
        row_skills_str = str(row.get("Skills", "")).lower()
        # Clean the string, split by comma, and remove leading/trailing whitespace
        row_skills = [s.strip() for s in row_skills_str.split(",") if s.strip()]
        
        # Find which of the user's skills match the internship's skills
        user_skills_lower = [s.lower() for s in skills]
        matched_skills = [s for s in user_skills_lower if s in row_skills]
        
        if matched_skills:
            score += len(matched_skills)
            reasons.append(f"Skills match ({', '.join(matched_skills)})")

        # Only add to results if a match was found
        if score > 0:
            results.append({
                "CompanyName": row["CompanyName"],
                "Title": row["Title"],
                "Sector": row["Sector"],
                "Education": row["Education"],
                "Skills": row_skills,
                "Location": row["Location"],
                "Reasons": reasons,
                "Score": score
            })

    # Sort the results by score in descending order
    results = sorted(results, key=lambda x: x["Score"], reverse=True)

    # Return only the top N recommendations
    return results[:top_n]
