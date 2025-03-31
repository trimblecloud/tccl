# TCCL 2025 Web Application

This web application serves as the official website for the Trimble Cloud Championship League 2025 event. It features team information, event schedules, tournament fixtures, house members listings, and an interactive "Guess Who?" game.

## Features

- Home page with current leaderboard and team captains
- Events schedule with upcoming and past events
- Team fixtures and tournament details
- House members listing with team affiliations
- Interactive "Guess Who?" game with leaderboard integration
- Optional Google authentication to save game scores

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Development Workflow

### Branching Strategy

We follow a feature branching strategy for development:

1. Create a new branch for each feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Test your changes thoroughly in the development environment.

4. When satisfied with your changes, create a pull request to merge into the main branch.

5. After code review, merge the feature branch into main.

### Code Structure

- `/src`: Source code
  - `/components`: React components
  - `/logo`: Logo images
  - `/images`: Image assets including participant photos
  - `/firebase.js`: Firebase configuration

## Deployment

This project is deployed using GitHub Pages. Follow these steps to deploy changes:

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the contents of the `build` folder to the `docs` folder:
   ```bash
   # On Windows
   xcopy /E /I /Y build\* docs\
   
   # On macOS/Linux
   cp -R build/* docs/
   ```

3. Commit and push the changes to the main branch:
   ```bash
   git add docs
   git commit -m "Deploy: update website with latest changes"
   git push origin main
   ```

4. GitHub Actions will automatically deploy the changes to GitHub Pages.
   - The website will be available at `https://[username].github.io/[repository-name]`

## Technologies Used

- React 18
- Material-UI 5
- Firebase (Authentication, Firestore)
- GitHub Pages for hosting

## Contact

For questions or support, contact the TCCL 2025 organizing committee.