internshipForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const education = document.getElementById('education-select').value;
    const skills = Array.from(document.querySelectorAll('#skills-label + .checkbox-group input[type="checkbox"]:checked')).map(cb => cb.value);
    const location = document.getElementById('location-select').value;

    fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            education: education,
            skills: skills,
            sector: selectedSector,
            location: location
        })
    })
    .then(res => res.json())
    .then(data => {
        recommendationsList.innerHTML = '';
        if (data.length === 0) {
            noRecommendationsMessage.style.display = 'block';
        } else {
            noRecommendationsMessage.style.display = 'none';
            data.forEach(internship => {
                const card = createInternshipCard(internship, internship.Reasons);
                recommendationsList.appendChild(card);
                setTimeout(() => card.classList.add('visible'), 50);
            });
        }
    })
    .catch(err => console.error("Error fetching recommendations:", err));
});

