import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(() => {
		const savedMode = localStorage.getItem("darkMode");
		if (savedMode !== null) {
			return JSON.parse(savedMode);
		}
		// Check system preference
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		// Update localStorage when darkMode changes
		localStorage.setItem("darkMode", JSON.stringify(darkMode));

		// Update document class
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useDarkMode() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useDarkMode must be used within a ThemeProvider');
	}
	return context;
} 