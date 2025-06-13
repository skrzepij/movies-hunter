# 🎬 Movies Hunter

Modern React.js application for movie discovery with favorites management. Built with TypeScript following good frontend practices.

🌐 **Live Demo**: [movies-hunter.pages.dev](https://movies-hunter.pages.dev)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 5.7, Vite 6.3
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: SCSS with CSS Modules, Mobile-first design
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **API**: TMDb (The Movie Database) v3

## 🚀 Features

- Movie search with debounced input and pagination
- Browse movie categories (Popular, Top Rated, Now Playing)
- Detailed movie modal with more details
- Favorites management with localStorage
- Responsive design with mobile-first approach
- Error handling and loading states

## 📦 Quick Start

```bash
# Set proper node.js version via nvm
nvm install && nvm use

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI dashboard
npm run test:ui
```

## 🐳 Docker (Optional)

```bash
# Using Docker
docker build -t movies-hunter .
docker run -d -p 8080:80 movies-hunter

# Using Podman
podman build -t movies-hunter .
podman run -d -p 8080:80 movies-hunter
```

## 🧪 Testing

The project includes testing setup with:
- **Unit Tests**: Components, hooks, and utilities testing
- **Coverage Reports**: Detailed coverage analysis with v8
- **Test UI**: Interactive testing dashboard
- **Coverage Thresholds**: Minimum 70% coverage for branches, functions, lines, statements

```bash
# Run all tests once
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Generate coverage report (HTML + terminal)
npm run test:coverage

# Open interactive test UI dashboard
npm run test:ui
```

## 🏗️ Architecture

- **Component Structure**: Separation of concerns with reusable components
- **State Management**: Redux Toolkit for global state, RTK Query for API caching
- **TypeScript**: Strict mode, no `any` types
- **Testing**: Unit tests for components, hooks, and utilities
- **Performance**: Debounced search, memoization, code splitting

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Route-level components
├── services/       # API services (RTK Query)
├── store/          # Redux store and slices
├── types/          # TypeScript definitions
├── utils/          # Helper functions
└── scss/           # Global styles and utilities
```
