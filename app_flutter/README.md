# Nataraj AI - Flutter App

This directory contains the Flutter app for the Nataraj AI project, currently tested and developed for Android devices. The app enables users to practice AI-generated dances and receive PoseNet scores at all instances. Future updates will include support for iOS and desktop platforms.

## Features

- **AI-Generated Dances:** Practice dances generated via the Nataraj AI system.
- **PoseNet Scoring:** Get real-time PoseNet scores while practicing dances.
- **OAuth Integration:** Supports GitHub and Google OAuth for authentication.
- **Provider State Management:** Efficient state management using the Provider package.
- **Firebase Integration:** Utilizes Firebase for authentication and data management.
- **Custom Backend:** Interacts with a Flask backend available in the `backend_flask` directory of the `nataraj-ai` repository.

## Directory Structure

The `lib` directory is organized as follows:

- `main.dart`: Entry point of the application.
- `controllers/`: Contains controllers for authentication and other functionalities.
- `widgets/`: Commonly used widgets across the app.
- `utils/`: Utility functions and helpers.
- `views/`: UI pages of the app.
- `models/`: Models for user and authentication data.

## Getting Started

### Prerequisites

- **Flutter SDK**: Make sure you have Flutter installed. Follow the [official guide](https://flutter.dev/docs/get-started/install) for setup instructions.
- **GitHub OAuth Credentials**: You'll need to set up a `.env` file at the root of the `app_flutter` directory containing your GitHub OAuth credentials:

  ```env
  GITHUB_CLIENT_ID=your_github_client_id
  GITHUB_CLIENT_SECRET=your_github_client_secret
  ```

  Obtain these credentials from your GitHub Developer settings.

- **Firebase Configuration**: Download your `google-services.json` file from the Firebase Console and place it in the `android/app/` directory.

### Running the App Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nataraj-ai.git
   cd nataraj-ai/app_flutter
   ```

2. **Install Dependencies**:
   ```bash
   dart pub get
   ```

3. **Run the App**:
   ```bash
   flutter run
   ```

   The app will launch on your connected Android device or emulator. Future support for iOS and desktop is planned.
