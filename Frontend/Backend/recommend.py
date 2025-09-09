def get_recommendations(df, education, skills, sector, location, top_n=5):
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

        # Match skills
        row_skills = str(row["Skills"]).split(",")
        matched_skills = [s for s in skills if s in row_skills]
        if matched_skills:
            score += len(matched_skills)
            reasons.append("Skills match (" + ", ".join(matched_skills) + ")")

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

    # Sort by score (higher = better)
    results = sorted(results, key=lambda x: x["Score"], reverse=True)

    return results[:top_n]
