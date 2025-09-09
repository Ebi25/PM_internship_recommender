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
    if df.empty:
        print("Warning: The internship DataFrame is empty. No recommendations can be generated.")
        return []

    results = []

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

        # Corrected skills matching logic: split by semicolon
        row_skills_str = str(row.get("Skills", "")).lower()
        row_skills = [s.strip() for s in row_skills_str.split(";") if s.strip()]
        
        user_skills_lower = [s.lower() for s in skills]
        matched_skills = [s for s in user_skills_lower if s in row_skills]
        
        if matched_skills:
            score += len(matched_skills)
            reasons.append(f"Skills match ({', '.join(matched_skills)})")

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

    results = sorted(results, key=lambda x: x["Score"], reverse=True)

    return results[:top_n]
