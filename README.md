Pradhan Mantri Internship Recommender
This is a lightweight web application designed to help users find suitable internships based on their education, skills, sector interests, and location preferences. The application is built with a separate frontend and backend, demonstrating a client-server architecture.

Features
Internship Recommendation: Provides internship suggestions by filtering a mock dataset based on user input.

Frontend: A user-friendly, responsive interface built with HTML, CSS, and JavaScript.

Backend: A Python Flask server that handles data filtering and serves the recommendations to the frontend.

Project Structure
The project is organized into two main directories:

Frontend/: Contains all the client-side code, including the HTML, CSS, and JavaScript files.

Backend/: Contains the Python Flask server and the data it uses.

Getting Started
Follow these steps to get a copy of the project up and running on your local machine.

Prerequisites
You need to have Python installed on your computer.

Step 1: Clone the Repository
Open your terminal or command prompt and clone the project from GitHub:

git clone [https://github.com/Ebi25/PM_internship_recommender.git]
cd pm-internship-recommender

Step 2: Install Dependencies
You need to install the required Python libraries for the backend. Navigate to the Backend directory and use pip to install the packages.

cd Backend
pip install Flask pandas Flask-Cors

Step 3: Run the Backend Server
With the dependencies installed, you can start the Flask server. Make sure you are still in the Backend directory.

python app.py
The server will start and you will see a message in the terminal indicating that it's running on http://127.0.0.1:5000.

Step 4: Run the Frontend Server
Now, you need to serve the frontend files. Open a new terminal window and navigate to the Frontend directory.

cd ../Frontend
python -m http.server


This will start a simple web server, usually at http://localhost:8000.

Step 5: View the Application
Open a web browser and go to http://localhost:8000. You should see the application's user interface.

Contributing
If you want to contribute to this project, follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes and commit them (git commit -m 'feat: Add a new feature').

Push to the branch (git push origin feature/your-feature-name).

Create a Pull Request to merge your changes into the main branch.