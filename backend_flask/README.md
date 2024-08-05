# Nataraj AI - Backend Flask

This directory contains all the API routes and backend logic for the Nataraj AI project. The backend is built using Flask and integrates with Firebase Admin SDK and Google Vertex AI for handling various functionalities.

The API is live at [https://singular-node-429217-j4.uc.r.appspot.com/](https://singular-node-429217-j4.uc.r.appspot.com/).

## Directory Structure

- `file_manipulation.py`: Contains functions to manipulate audio files, such as trimming.
- `gemini_api.py`: Contains logic for interacting with the Gemini API.
- `firebase_functions.py`: Contains functions for CRUD operations on both Firestore and Firebase Realtime Database (RTDB).
- `main.py`: The main entry point for the Flask application, containing all the route definitions.

## Prerequisites

Ensure you have the following installed on your machine:
- Python 3.8 or later
- Flask
- Firebase Admin SDK
- Google Cloud SDK

## Setup

Follow these steps to set up and run the backend locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/shrutixyz/nataraj-ai.git
    cd nataraj-ai/backend_flask
    ```

2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Add Firebase configuration:**
    Create a Firebase service account and download the JSON key file. Place the key file in the root of the `backend_flask` directory and set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:
    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="path/to/your-service-account-file.json"
    ```

4. **Run the application:**
    ```bash
    python main.py
    ```

    This will start the Flask development server and you can view the application at `http://localhost:5000`.

## Route Definitions

### `GET /`
Returns a simple hello world HTML page.

### `GET /blogs`
Returns a JSON response containing the content of all `.md` files in the `static/blogs` directory.

### `GET /createuserdata/<uid>`
Creates user data if it doesn't exist in Firestore.

### `POST /contactus`
Accepts contact form data (email and text) and stores it in Firestore.

### `GET /fetchprojects/<uid>`
Fetches project IDs associated with a user ID from Firestore.

### `GET /changeprojectvisibility/<pid>/<visibility>`
Changes the visibility of a project in the Firebase RTDB.

### `GET /deleteproject/<pid>`
Deletes a project from the Firebase RTDB.

### `GET /deleteaccount/<uid>`
Deletes a user account from Firebase Auth and Firestore.

### `POST /createproject`
Creates a new project with an uploaded file and stores the data in Firebase RTDB and Firestore.

### `POST /updatedanceform`
Updates the dance form for a project in the Firebase RTDB.

### `POST /generatedance`
Generates dance steps for a project using the Gemini API and updates the project in the Firebase RTDB.

## Functionality Details

### 3D Visualization
We use Unity plugins to bring 3D elements into the application. The steps for the model are fetched via the Gemini API and stored in Firebase Realtime Database.

### File Manipulation
The `file_manipulation.py` file contains functions to trim audio files using the `soundfile` library.

### Firebase Functions
The `firebase_functions.py` file contains functions for creating, reading, updating, and deleting documents in Firestore and Firebase Realtime Database.

### Gemini API Integration
The `gemini_api.py` file contains the logic for interacting with the Gemini API, fetching steps, and generating dance sequences.

## Deployment

The backend can be deployed on any cloud platform supporting Flask applications. Ensure that the Firebase service account JSON key file is securely stored and the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set.

We've currently deployed it on Google App Engine.
