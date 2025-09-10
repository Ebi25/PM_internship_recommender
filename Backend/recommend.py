import re

def normalize_and_split_skills(skills_field):
    """
    Accepts a string from CSV (skills) and returns a list of normalized skills (lowercase).
    Splits on ; , | / and extra spaces.
    """
    if not isinstance(skills_field, str):
        return []
    # Replace common separators with semicolon, then split
    s = re.sub(r"[,/|]+", ";", skills_field)
    parts = [p.strip().lower() for p in s.split(";") if p.strip()]
    return parts

def get_recommendations(df, education, skills, sector, location, top_n=5):
    """
    Rule-based lightweight recommender.
    Returns list of dicts with keys:
      CompanyName, Title, Sector, Education, Skills (list), Location, Reasons (list), Score
    """
    if df is None or df.empty:
        return []

    # normalize user inputs
    user_education = (education or "").strip()
    user_sector = (sector or "").strip()
    user_location = (location or "").strip()
    user_skills = [s.strip().lower() for s in (skills or []) if isinstance(s, str) and s.strip()]

    results = []

    for _, row in df.iterrows():
        score = 0
        reasons = []

        row_education = str(row.get("Education", "")).strip()
        row_sector = str(row.get("Sector", "")).strip()
        row_location = str(row.get("Location", "")).strip()

        # Education match (strong)
        if user_education:
            if row_education.lower() == user_education.lower() or row_education.lower() == "any graduate":
                score += 3
                reasons.append(f"Education match ({user_education})")
        else:
            # no user education specified -> small default boost
            score += 0

        # Sector match (strong)
        if user_sector:
            if row_sector.lower() == user_sector.lower():
                score += 3
                reasons.append(f"Sector interest ({user_sector})")

        # Location match (strong)
        if user_location:
            if row_location.lower() == user_location.lower() or row_location.lower() == "remote":
                score += 2
                reasons.append(f"Preferred location ({user_location})")

        # Skills match (count matches)
        row_skills = normalize_and_split_skills(row.get("Skills", ""))
        matched_skills = [s for s in user_skills if s in row_skills]
        if matched_skills:
            # give one point per matched skill
            score += len(matched_skills)
            reasons.append("Skills match (" + ", ".join(matched_skills) + ")")

        # If we got any score, include
        if score > 0:
            results.append({
                "InternshipID": int(row.get("InternshipID")) if row.get("InternshipID") is not None else None,
                "CompanyName": row.get("CompanyName", ""),
                "Title": row.get("Title", ""),
                "Sector": row_sector,
                "Education": row_education,
                "Skills": row_skills,
                "Location": row_location,
                "Reasons": reasons,
                "Score": score
            })

    # sort by score desc, then by CompanyName for stable ordering
    results.sort(key=lambda x: (-x["Score"], x["CompanyName"]))
    return results[:top_n]
