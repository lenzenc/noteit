# NoteIt - Organizational Platform

NoteIt is a modern React-based web application designed for technology leaders to stay organized. It provides a comprehensive platform for managing notes, tasks, and imported TextMate files with an elegant Mac-inspired UI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `build/` directory.

## 🛠️ Technology Stack

- **React 18+** - Modern React with hooks and functional components
- **TypeScript** - Type safety and enhanced developer experience
- **Material-UI v6+** - Comprehensive UI component library
- **Webpack 5** - Module bundling with hot module replacement
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **date-fns** - Modern date utility library

## 📁 Project Structure

```
noteit/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   ├── TopBar.tsx    # Top navigation bar
│   │   ├── RightPanel.tsx # Right panel with calendar
│   │   └── Calendar.tsx  # Calendar widget
│   ├── pages/           # Page components
│   │   └── Dashboard.tsx # Main dashboard page
│   ├── stores/          # Zustand state management
│   │   └── useAppStore.ts # Global app store
│   ├── styles/          # Styling files
│   │   ├── theme.ts     # Material-UI theme config
│   │   └── global.css   # Global CSS styles
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Application entry point
├── public/              # Static assets
├── webpack.config.js    # Webpack configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## ✨ Current Features

### Implemented
- ✅ **Navigation Sidebar** - Multi-section navigation with active state indicators
- ✅ **Dashboard Page** - Main dashboard with action buttons (Quick Note, Add Task, Import TextMate, Sync Files)
- ✅ **Calendar Widget** - Interactive calendar in the right panel showing current month
- ✅ **Responsive Layout** - Three-column layout with sidebar, main content, and right panel
- ✅ **Material-UI Theming** - Consistent Mac-inspired design system
- ✅ **TypeScript Support** - Full type safety across the application
- ✅ **Zustand Store** - State management for tasks, notes, and calendar events

### Placeholder Features (Coming Soon)
- 📝 Notes management system
- ✅ Task tracking and management
- 📄 TextMate file import and sync
- 🔍 Search functionality
- 📊 Analytics and reporting
- 👥 Team collaboration features

## 🎨 Design Features

- Mac-inspired elegant UI with blur effects
- Smooth animations and transitions
- Consistent color scheme (#007aff primary)
- Responsive design for various screen sizes
- Custom scrollbars
- Hover effects on interactive elements

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🔧 Configuration Files

- `webpack.config.js` - Webpack bundler configuration
- `tsconfig.json` - TypeScript compiler options
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules

## 🚦 Development Guidelines

1. All components use TypeScript with strict type checking
2. Follow the established folder structure
3. Use Material-UI components and theme
4. Maintain consistent coding style with ESLint and Prettier
5. Components should be functional with hooks

## 📦 Deployment

The built application can be deployed to any static hosting service:

- **Netlify**: Drop the `build` folder into Netlify
- **Vercel**: Connect your repository and deploy
- **AWS S3**: Upload build contents to S3 bucket with static hosting
- **GitHub Pages**: Use gh-pages package to deploy

## 🐛 Troubleshooting

### Port 3000 already in use
Change the port in webpack.config.js or use:
```bash
PORT=3001 npm start
```

### Module not found errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
Run type checking separately:
```bash
npm run typecheck
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.