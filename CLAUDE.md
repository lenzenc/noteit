# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NoteIt is a React-based web application designed for technology leaders to stay organized. The project is currently in its initial phase with requirements and mockup defined.

## Technology Stack Requirements

- React 18+ with TypeScript
- Webpack 5 for bundling
- Material-UI v7+ for UI components
- Zustand for state management
- React Router for navigation
- ESLint + Prettier for code quality

## Development Commands

Since the project is not yet initialized, you'll need to set up the React application first:

1. Initialize the project: `npm init -y`
2. Install dependencies as specified in initial-promte.md
3. Start development server: `npm start`
4. Build for production: `npm run build`
5. Run linting: `npm run lint`
6. Run type checking: `npm run typecheck`

## Project Architecture

The application should follow this structure:
- `/src/components/` - Reusable React components
- `/src/pages/` - Page-level components
- `/src/stores/` - Zustand state management stores
- `/src/styles/` - Styling files
- `/src/utils/` - Utility functions
- `/src/hooks/` - Custom React hooks
- `/src/types/` - TypeScript type definitions
- `/src/assets/` - Static assets

## Design Requirements

- Mac-inspired elegant UI design
- Smart and professional appearance similar to native Mac applications
- Responsive layout with sidebar navigation
- Dashboard-focused organization system
- Integration with TextMate file imports

## Key Features to Implement

1. Dashboard with organizational widgets
2. Note management system
3. Task tracking functionality
4. TextMate file import capability
5. Calendar integration
6. Search functionality across notes and tasks
7. Activity feed and statistics

## TypeScript Configuration

Ensure strict TypeScript configuration with:
- Proper type definitions for all components
- Type-safe routing
- Typed Zustand stores
- Interface definitions for props and state

## Important Notes

- The mockup.html file provides the visual design reference for the application
- Follow Material-UI theming for consistency
- Implement proper error boundaries and user-friendly error messages
- Ensure cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Include accessibility features (ARIA labels, keyboard navigation)