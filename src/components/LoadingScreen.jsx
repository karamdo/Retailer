import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function LoadingScreen({ onLoadComplete }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Call onLoadComplete after a short delay to ensure animations complete
                    setTimeout(() => {
                        setIsLoading(false);
                        if (onLoadComplete) {
                            onLoadComplete();
                        }
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="relative text-center">
                {/* Neural Network Background */}
                <div className="absolute inset-0 -z-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-1 w-1 animate-pulse rounded-full bg-blue-500"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: 0.3,
                            }}
                        />
                    ))}
                </div>

                {/* Logo and Text */}
                <div className="relative">
                    <Logo
                        size="large"
                        isAnimating={true}
                        className="mx-auto mb-4 transform text-blue-500 transition-transform duration-300 hover:scale-110"
                    />
                    <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
                        <span className="inline-block">R</span>
                        <span className="inline-block">E</span>
                        <span className="inline-block">T</span>
                        <span className="inline-block animate-bounce">A</span>
                        <span className="inline-block animate-bounce">I</span>
                        <span className="inline-block">L</span>
                        <span className="inline-block">E</span>
                        <span className="inline-block">R</span>
                    </h1>

                    {/* Progress Bar */}
                    <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Loading... {progress}%
                    </p>
                </div>
            </div>
        </div>
    );
}
