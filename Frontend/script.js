// script.js - Clean internship recommendation system
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const internshipForm = document.getElementById("internship-form");
  const recommendationsList = document.getElementById("recommendations-list");
  const noRecommendationsMessage = document.getElementById("no-recommendations-message");
  const languageSelect = document.getElementById("language-select");
  const sectorButtons = document.querySelectorAll(".sector-button");

  const stepForm = document.getElementById("step-form");
  const stepResults = document.getElementById("step-results");
  const backToFormBtn = document.getElementById("back-to-form");

  let selectedSector = null;

  // Translations
  const translations = {
    en: {
      schemeName: "Pradhan Mantri Internship Scheme",
      subtitle: "A lightweight recommender to help you find suitable internships",
      findHeading: "Explore Opportunities under the Pradhan Mantri Internship Scheme",
      formDescription: "Answer a few questions and get 3–5 recommended internships.",
      educationLabel: "🎓 Education",
      skillsLabel: "💡 Skills (choose any)",
      sectorLabel: "🏢 Sector Interests",
      locationLabel: "📍 Preferred Location",
      getRecommendationsButton: "✨ Get Recommendations",
      recommendationsHeading: "Your Internship Recommendations",
      noRecommendationsMessage: 'Fill the form and click "Get Recommendations" to see suggestions.',
      apply: "Apply Now",
      read: "Read Aloud",
      reasonPrefix: "Recommended for you because:",
      loadingMessage: "Loading recommendations…",
      errorMessage: "Unable to fetch recommendations. Please try again later.",
      backButton: "← Back"
    },
    hi: {
      schemeName: "प्रधानमंत्री इंटर्नशिप योजना",
      subtitle: "आपके लिए उपयुक्त इंटर्नशिप खोजने के लिए एक हल्का सिफारिशी उपकरण",
      findHeading: "प्रधानमंत्री इंटर्नशिप योजना के तहत अवसर खोजें",
      formDescription: "कुछ प्रश्नों का उत्तर दें और 3–5 सिफारिश की गई इंटर्नशिप प्राप्त करें।",
      educationLabel: "🎓 शिक्षा",
      skillsLabel: "💡 कौशल (कोई भी चुनें)",
      sectorLabel: "🏢 सेक्टर रुचियां",
      locationLabel: "📍 पसंदीदा स्थान",
      getRecommendationsButton: "✨ सिफारिशें प्राप्त करें",
      recommendationsHeading: "आपकी इंटर्नशिप सुझाव",
      noRecommendationsMessage: 'फ़ॉर्म भरें और "सिफारिशें प्राप्त करें" पर क्लिक करें।',
      apply: "अभी आवेदन करें",
      read: "ज़ोर से पढ़ें",
      reasonPrefix: "यहाँ इसलिए अनुशंसित है:",
      loadingMessage: "सिफारिशें लोड हो रही हैं…",
      errorMessage: "सिफारिशें प्राप्त नहीं हो सकीं। कृपया बाद में पुनः प्रयास करें।",
      backButton: "← वापस"
    },
    ta: {
      schemeName: "பிரதமர் இன்டர்ன்ஷிப் திட்டம்",
      subtitle: "நீங்கள் பொருத்தமான இன்டர்ன்ஷிப்புகளை கண்டுபிடிக்க உதவும் ஒரு லைட் ரெகமென்டர்",
      findHeading: "பிரதமர் இன்டர்ன்ஷிப் திட்டத்தின் கீழ் வாய்ப்புகளை ஆராயுங்கள்",
      formDescription: "சில கேள்விகளுக்கு பதிலிடுங்கள் மற்றும் 3–5 பரிந்துரைகளைப் பெறுங்கள்.",
      educationLabel: "🎓 கல்வி",
      skillsLabel: "💡 திறன்கள் (எதாவது தேர்ந்தெடுக்கவும்)",
      sectorLabel: "🏢 துறை ஆர்வங்கள்",
      locationLabel: "📍 விருப்பமான இடம்",
      getRecommendationsButton: "✨ பரிந்துரைகளைப் பெறுங்கள்",
      recommendationsHeading: "உங்கள் இன்டர்ன்ஷிப் பரிந்துரைகள்",
      noRecommendationsMessage: '"பரிந்துரைகள் பெறுங்கள்" என்பதைக் கிளிக் செய்து படிவத்தை நிரப்பவும்.',
      apply: "இப்போது விண்ணப்பிக்கவும்",
      read: "உரக்கப் படிக்கவும்",
      reasonPrefix: "பரிந்துரைக்கப்படுவது காரணம்:",
      loadingMessage: "பரிந்துரைகள் ஏற்றப்படுகின்றன…",
      errorMessage: "பரிந்துரைகளைப் பெற முடியவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
      backButton: "← மீண்டும்"
    }
  };

  // Sector icons mapping
  const sectorIcons = { 
    IT: "💻", 
    Finance: "🏦", 
    Healthcare: "🏥", 
    Energy: "💡", 
    Retail: "🛍️" 
  };

  // Initialize translation
  function translateUI() {
    const lang = languageSelect.value;
    const t = translations[lang];
    
    // Update all text elements
    document.getElementById("scheme-name").textContent = t.schemeName;
    document.getElementById("scheme-subtitle").textContent = t.subtitle;
    document.getElementById("find-internships-heading").textContent = t.findHeading;
    document.getElementById("form-description").textContent = t.formDescription;
    document.getElementById("education-label").textContent = t.educationLabel;
    document.getElementById("skills-label").textContent = t.skillsLabel;
    document.getElementById("sector-label").textContent = t.sectorLabel;
    document.getElementById("location-label").textContent = t.locationLabel;
    document.getElementById("get-recommendations-button").textContent = t.getRecommendationsButton;
    document.getElementById("your-recommendations-heading").textContent = t.recommendationsHeading;
    document.getElementById("no-recommendations-message").textContent = t.noRecommendationsMessage;
    
    // Update back button if it exists
    if (backToFormBtn) {
      backToFormBtn.textContent = t.backButton;
    }
  }

  // Initialize UI translation
  translateUI();

  // Language change handler
  languageSelect.addEventListener("change", () => {
    translateUI();
    // Re-translate any existing cards
    retranslateCards();
  });

  // Sector button selection handler
  sectorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove selected class from all buttons
      sectorButtons.forEach(b => b.classList.remove("selected"));
      // Add selected class to clicked button
      btn.classList.add("selected");
      selectedSector = btn.dataset.sector;
      console.log("Selected sector:", selectedSector);
    });
  });

  // Get selected skills from checkboxes
  function getSelectedSkills() {
    const checkboxes = document.querySelectorAll("#skills-grid input[type='checkbox']");
    return Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  }

  // Create internship card HTML
  function createInternshipCard(item) {
    const t = translations[languageSelect.value];
    const card = document.createElement("div");
    card.className = "internship-card";
    card.dataset.id = item.InternshipID || "";

    const icon = sectorIcons[item.Sector] || "💼";
    const skillsText = Array.isArray(item.Skills) ? item.Skills.join(", ") : (item.Skills || "");
    const reasonsText = Array.isArray(item.Reasons) ? item.Reasons.join(", ") : (item.Reasons || "");

    card.innerHTML = `
      <div class="card-header">
        <div class="icon">${icon}</div>
        <h3>${escapeHtml(item.Title)}</h3>
      </div>
      <div class="card-meta">
        <span class="company">${escapeHtml(item.CompanyName)}</span>
        <div><strong>Sector:</strong> ${escapeHtml(item.Sector)}</div>
        <div><strong>Education:</strong> ${escapeHtml(item.Education || "")}</div>
        <div><strong>Location:</strong> ${escapeHtml(item.Location || "")}</div>
        <div><strong>Skills:</strong> ${escapeHtml(skillsText)}</div>
      </div>
      <div class="explainable-recommendation">
        <strong>${t.reasonPrefix}</strong> ${escapeHtml(reasonsText)}
      </div>
      <div class="card-actions">
        <button class="apply-button" type="button">${t.apply}</button>
        <button class="read-aloud-button" type="button">${t.read}</button>
      </div>
    `;

    // Add event listeners to card buttons
    const applyButton = card.querySelector(".apply-button");
    const readButton = card.querySelector(".read-aloud-button");

    applyButton.addEventListener("click", () => {
      window.open("https://pminternship.mca.gov.in/", "_blank");
    });

    readButton.addEventListener("click", () => {
      const textToRead = `${item.Title} at ${item.CompanyName}. Location: ${item.Location}. ${reasonsText}`;
      speakText(textToRead);
    });

    return card;
  }

  // Re-translate existing cards when language changes
  function retranslateCards() {
    const cards = document.querySelectorAll(".internship-card");
    const t = translations[languageSelect.value];
    
    cards.forEach(card => {
      const applyButton = card.querySelector(".apply-button");
      const readButton = card.querySelector(".read-aloud-button");
      const reasonElement = card.querySelector(".explainable-recommendation strong");
      
      if (applyButton) applyButton.textContent = t.apply;
      if (readButton) readButton.textContent = t.read;
      if (reasonElement) reasonElement.textContent = t.reasonPrefix;
    });
  }

  // HTML escape function for security
  function escapeHtml(text) {
    if (!text && text !== 0) return "";
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
  }

  // Text-to-speech functionality
  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = languageSelect.value;
    
    // Set language for speech synthesis
    if (lang === "hi") {
      utterance.lang = "hi-IN";
    } else if (lang === "ta") {
      utterance.lang = "ta-IN";
    } else {
      utterance.lang = "en-IN";
    }

    // Try to find a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang && voice.lang.toLowerCase().startsWith(utterance.lang.split("-")[0])
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Set speech parameters
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }

  // Show loading state
  function showLoadingState() {
    const t = translations[languageSelect.value];
    recommendationsList.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div style="font-size: 2rem; margin-bottom: 16px;">⏳</div>
        <p class="muted">${t.loadingMessage}</p>
      </div>
    `;
    noRecommendationsMessage.style.display = "none";
  }

  // Show error state
  function showErrorState(message) {
    const t = translations[languageSelect.value];
    recommendationsList.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div style="font-size: 2rem; margin-bottom: 16px; color: #ef4444;">⚠️</div>
        <p class="muted">${message || t.errorMessage}</p>
      </div>
    `;
    noRecommendationsMessage.style.display = "none";
  }

  // Form submission handler
  internshipForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Get form data
    const formData = {
      education: document.getElementById("education-select").value,
      skills: getSelectedSkills(),
      sector: selectedSector || "",
      location: document.getElementById("location-select").value
    };

    console.log("Form data:", formData);

    // Show loading state
    showLoadingState();

    try {
      // Make API request
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const recommendations = await response.json();
      
      // Clear recommendations list
      recommendationsList.innerHTML = "";

      if (!recommendations || recommendations.length === 0) {
        // No recommendations found
        noRecommendationsMessage.style.display = "block";
      } else {
        // Display recommendations
        noRecommendationsMessage.style.display = "none";
        recommendations.forEach(item => {
          const card = createInternshipCard(item);
          recommendationsList.appendChild(card);
        });
      }

      // Navigate to results page
      stepForm.classList.remove("active");
      stepResults.classList.add("active");

    } catch (error) {
      console.error("Error fetching recommendations:", error);
      showErrorState();
    }
  });

  // Back to form button handler
  backToFormBtn.addEventListener("click", () => {
    stepForm.classList.add("active");
    stepResults.classList.remove("active");
  });

  // Initialize voices for speech synthesis (load them asynchronously)
  if ("speechSynthesis" in window) {
    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices.length);
    };
    
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    loadVoices(); // Call immediately in case voices are already loaded
  }

  console.log("PM Internship Scheme initialized successfully!");
});