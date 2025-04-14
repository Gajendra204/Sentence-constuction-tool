# Sentence Construction Tool

A React-based interactive quiz application that helps users practice and improve their sentence construction skills through fill-in-the-blank exercises.

## Features

- Interactive sentence completion exercises
- Real-time word selection and arrangement
- 30-second timer for each question
- Progress tracking
- Detailed results and performance analysis
- Responsive design works on desktop and mobile devices

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Axios for API communication
- JSON Server for mock backend

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the mock backend server:

```bash
npm run server
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Click "Start Test" on the welcome screen
2. For each question:
   - Read the sentence with blanks
   - Select words from the available options to fill in the blanks
   - Submit your answer within 30 seconds
   - Progress to the next question
3. View your results and performance analysis at the end
4. Option to restart the test and try again

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start mock backend server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API and other services
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

## API

The application uses a JSON Server backend with endpoints:

- GET `/data` - Fetches quiz questions and metadata

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
