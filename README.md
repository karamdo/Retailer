# Retailer - Modern E-commerce Application

A modern e-commerce application built with React, Vite, and TailwindCSS, featuring a clean and responsive user interface.

## 🚀 Tech Stack

- **Frontend Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** TailwindCSS 4.1.8
- **Routing:** React Router DOM 7.6.2
- **Icons:** React Icons 5.5.0
- **Notifications:** React Toastify 11.0.5
- **Deployment:** GitHub Pages
- **Code Quality:**
  - ESLint 9.25.0
  - Prettier 3.5.3
  - TypeScript Support

## 📁 Project Structure

```
retailer2/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   ├── index.css       # Global styles
│   └── showToast.jsx   # Toast notification utility
├── public/             # Static assets
├── dist/               # Production build output
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # TailwindCSS configuration
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .gitignore          # Git ignore rules
└── package.json        # Project dependencies and scripts
```

## 🛠️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd retailer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

6. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run predeploy` - Build for deployment
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Features

- Modern and responsive UI using TailwindCSS
- Client-side routing with React Router
- Toast notifications for user feedback
- Custom React hooks for reusable logic
- Context-based state management
- TypeScript support for better type safety
- Code formatting with Prettier
- Linting with ESLint

## 🔧 Configuration Files

- **vite.config.js** - Vite bundler configuration
- **tailwind.config.js** - TailwindCSS customization
- **eslint.config.js** - ESLint rules and settings
- **.prettierrc** - Prettier code formatting rules

## 📦 Dependencies

### Production Dependencies
- React and React DOM (19.1.0)
- React Router DOM (7.6.2) for routing
- React Icons (5.5.0) for icon components
- React Toastify (11.0.5) for notifications
- TailwindCSS (4.1.8) for styling

### Development Dependencies
- Vite (6.3.5) for development and building
- ESLint (9.25.0) for code linting
- Prettier (3.5.3) for code formatting
- TypeScript type definitions
- gh-pages (6.3.0) for deployment
- Various ESLint plugins and development tools

## 🚀 Deployment

The application is configured for deployment to GitHub Pages. The deployment process is automated using the `gh-pages` package:

1. The `predeploy` script automatically builds the production version of the application
2. The `deploy` script publishes the built files to the `gh-pages` branch
3. GitHub Pages serves the application from the `gh-pages` branch

To deploy updates:
1. Commit your changes to the main branch
2. Run `npm run deploy`
3. Wait for GitHub Pages to update (usually takes a few minutes)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.