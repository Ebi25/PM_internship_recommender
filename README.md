PM Internship Recommender

This is a lightweight web application designed to help users find suitable internships based on their education, skills, sector interests, and location preferences. The application demonstrates a client-server architecture with a clear separation between the frontend and backend.



Table of Contents

Features



Tech Stack



Project Structure



Getting Started



Contributing



License



Features

Internship Recommendation: Provides internship suggestions by filtering a mock dataset based on user preferences.



User-friendly Interface: A simple, responsive frontend that is mobile-first and easy to navigate.



Modular Design: A clear separation between the frontend and backend components.



Tech Stack

Frontend: HTML, CSS, JavaScript



Backend: Python, Flask, Pandas



Project Structure

pm-internship-recommender/

├── Backend/         # Python Flask backend

│   ├── app.py

│   └── (data files)

├── Frontend/        # HTML, CSS, and JS files

│   ├── index.html

│   ├── style.css

│   └── script.js

└── README.md        # Project documentation





Getting Started

Follow these steps to get a copy of the project up and running on your local machine.



Prerequisites

You need to have Python installed on your computer.



1\. Clone the Repository

Open your terminal or command prompt and clone the project from GitHub:



git clone \[https://github.com/Ebi25/PM\_internship\_recommender.git](https://github.com/Ebi25/PM\_internship\_recommender.git)

cd PM\_internship\_recommender





2\. Install Dependencies

You need to install the required Python libraries for the backend. Navigate to the Backend directory and use pip to install the packages.



cd Backend

pip install Flask pandas Flask-Cors





3\. Run the Project

Start the backend server in one terminal and the frontend server in a second terminal.



Start Backend



cd Backend

python app.py





Start Frontend



cd ../Frontend

python -m http.server





4\. Open in Browser

Visit http://localhost:8000 to view the frontend in your browser.



Contributing

If you want to contribute to this project, please follow these steps:



Fork the repository.



Create a new branch (git checkout -b feature/your-feature-name).



Make your changes.



Commit and push your changes to your branch.



Open a Pull Request to merge your changes into the main branch.



License

This project is licensed under the MIT License.

