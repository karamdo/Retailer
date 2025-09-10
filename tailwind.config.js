/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 3s linear infinite",
                draw: "draw 1.5s ease-in-out forwards",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "bounce-slow": "bounce 2s infinite",
                "slide-up": "slideUp 0.5s ease-out forwards",
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "neural-pulse": "neuralPulse 2s ease-in-out infinite",
            },
            keyframes: {
                draw: {
                    "0%": { strokeDashoffset: "100%" },
                    "100%": { strokeDashoffset: "0%" },
                },
                slideUp: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                neuralPulse: {
                    "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
                    "50%": { transform: "scale(1.2)", opacity: "0.6" },
                },
            },
        },
    },
    plugins: [],
};
