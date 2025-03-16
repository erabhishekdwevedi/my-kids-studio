# My Kids Studio

An interactive educational platform for children featuring games, quizzes, and creative activities.

## Features

- Profile selection for multiple users
- Theme customization
- Various educational subjects
- Interactive games and activities
- Drawing board
- Piano learning tool
- Quiz system
- Car racing game
- Snake game

## Navigation

The application uses a consistent navigation pattern across all pages:

- **PageNavigation**: A reusable component that provides:
  - Back button (left side)
  - Home button (left side, next to back button)
  - Title or Profile display (right side)
  - Mute button (right side) for audio control

This consistent navigation pattern ensures users always have access to essential controls regardless of which page they're on.

![Navigation Example](public/navigation-example.png)

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.

## Technologies Used

- React
- TypeScript
- Material UI
- Framer Motion
- React Router

## Learning Categories

- **Math Adventures**: Fun with numbers, shapes, and puzzles
- **Reading & Language**: Stories, vocabulary, and language skills
- **Science Explorers**: Discover the wonders of science
- **Art & Creativity**: Express yourself through art and crafts
- **Fun & Games**: Educational games that make learning fun

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kids-studio.git
   cd kids-studio
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components for different sections
- `/src/assets` - Static assets like images
- `/src/styles` - Global styles and theme configuration
- `/src/utils` - Utility functions
- `/src/contexts` - React context providers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Special thanks to all educators who inspire children to learn and grow.
- Icons provided by Material-UI.
