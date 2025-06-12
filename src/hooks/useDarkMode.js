import { useState, useEffect } from "react";

export function useDarkMode() {
    // Initialize darkMode from localStorage or system preference
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

    return { darkMode, toggleDarkMode };
}
