import { useEffect, useState } from 'react';

export default function Logo({ className = '', size = 'default', isAnimating = false }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const sizes = {
		small: 'w-8 h-8',
		default: 'w-12 h-12',
		large: 'w-16 h-16'
	};

	// Neural network node positions
	const nodes = [
		{ x: 20, y: 20 }, { x: 50, y: 20 }, { x: 80, y: 20 },
		{ x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
		{ x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
	];

	return (
		<div className={`relative ${sizes[size]} ${className}`}>
			<svg
				viewBox="0 0 100 100"
				className={`w-full h-full transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
			>
				{/* Neural Network Nodes */}
				{nodes.map((node, index) => (
					<circle
						key={index}
						cx={node.x}
						cy={node.y}
						r="3"
						className={`fill-current transition-all duration-700 ${isAnimating ? 'animate-pulse' : ''
							}`}
						style={{
							animationDelay: `${index * 0.1}s`
						}}
					/>
				))}

				{/* Neural Network Connections */}
				{nodes.map((node, index) => {
					// Connect each node to its neighbors
					const connections = nodes.slice(index + 1).map((targetNode, targetIndex) => (
						<line
							key={`${index}-${targetIndex}`}
							x1={node.x}
							y1={node.y}
							x2={targetNode.x}
							y2={targetNode.y}
							className={`stroke-current transition-all duration-1000 ${isAnimating ? 'animate-draw' : ''
								}`}
							style={{
								strokeWidth: 1,
								strokeDasharray: 100,
								strokeDashoffset: isAnimating ? 0 : 100,
								opacity: 0.3
							}}
						/>
					));
					return connections;
				})}

				{/* Shopping Cart */}
				<g
					className={`transition-all duration-700 ${isAnimating ? 'animate-bounce-slow' : ''
						}`}
					transform="translate(35, 35) scale(0.6)"
				>
					{/* Cart Body */}
					<path
						d="M10 20 L40 20 L45 5 L15 5 Z"
						className="fill-none stroke-current"
						style={{
							strokeWidth: 2,
							strokeDasharray: 100,
							strokeDashoffset: isAnimating ? 0 : 100
						}}
					/>
					{/* Cart Wheels */}
					<circle
						cx="15"
						cy="25"
						r="3"
						className="fill-current"
						style={{
							animationDelay: '0.5s'
						}}
					/>
					<circle
						cx="35"
						cy="25"
						r="3"
						className="fill-current"
						style={{
							animationDelay: '0.7s'
						}}
					/>
					{/* Cart Handle */}
					<path
						d="M5 20 L10 20"
						className="stroke-current"
						style={{
							strokeWidth: 2,
							strokeDasharray: 10,
							strokeDashoffset: isAnimating ? 0 : 10
						}}
					/>
				</g>

				{/* Outer Circle */}
				<circle
					cx="50"
					cy="50"
					r="45"
					className={`fill-none transition-all duration-1000 ${isAnimating ? 'animate-spin-slow' : ''
						}`}
					style={{
						stroke: 'currentColor',
						strokeWidth: 1,
						strokeDasharray: 280,
						strokeDashoffset: isAnimating ? 0 : 280,
						opacity: 0.2
					}}
				/>
			</svg>
		</div>
	);
} 