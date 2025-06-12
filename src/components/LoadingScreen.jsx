import { useEffect, useState } from 'react';
import Logo from './Logo';

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
		<div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
			<div className="text-center relative">
				{/* Neural Network Background */}
				<div className="absolute inset-0 -z-10">
					{Array.from({ length: 20 }).map((_, i) => (
						<div
							key={i}
							className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 2}s`,
								opacity: 0.3
							}}
						/>
					))}
				</div>

				{/* Logo and Text */}
				<div className="relative">
					<Logo
						size="large"
						isAnimating={true}
						className="mx-auto mb-4 text-blue-500 transform hover:scale-110 transition-transform duration-300"
					/>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
						<span className="inline-block animate-slide-up">R</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>E</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>T</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.3s' }}>A</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.4s' }}>I</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.5s' }}>L</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.6s' }}>E</span>
						<span className="inline-block animate-slide-up" style={{ animationDelay: '0.7s' }}>R</span>
					</h1>

					{/* Progress Bar */}
					<div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
						<div
							className="h-full bg-blue-500 transition-all duration-300 ease-out"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						Loading... {progress}%
					</p>
				</div>
			</div>
		</div>
	);
} 