import { useEffect, useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa6';

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

	// Node positions around the cart - adjusted for better spacing
	const nodes = [
		{ x: 25, y: 15 }, { x: 50, y: 10 }, { x: 75, y: 15 },
		{ x: 15, y: 40 }, { x: 85, y: 40 },
		{ x: 15, y: 60 }, { x: 85, y: 60 },
		{ x: 25, y: 85 }, { x: 50, y: 90 }, { x: 75, y: 85 }
	];

	return (
		<div className={`relative ${sizes[size]} ${className}`}>
			<svg
				viewBox="0 0 100 100"
				className={`w-full h-full transition-all relative duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
			>
				{/* Outer Nodes */}
				{nodes.map((node, index) => (
					<circle
						key={index}
						cx={node.x}
						cy={node.y}
						r="2.5"
						className={`fill-current transition-all duration-700 ${isAnimating ? 'animate-pulse' : ''}`}
						style={{
							animationDelay: `${index * 0.1}s`,
							opacity: 0.5
						}}
					/>
				))}

				{/* Node Connections */}
				{nodes.map((node, index) => {
					// Connect each node to its neighbors
					const connections = nodes.slice(index + 1).map((targetNode, targetIndex) => (
						<line
							key={`${index}-${targetIndex}`}
							x1={node.x}
							y1={node.y}
							x2={targetNode.x}
							y2={targetNode.y}
							className="stroke-current transition-all duration-1000"
							style={{
								strokeWidth: 1,
								strokeDasharray: 100,
								strokeDashoffset: isAnimating ? 0 : 100,
								opacity: 0.15
							}}
						/>
					));
					return connections;
				})}

				<BiCart className="text-6xl absolute translate-x-[18%] translate-y-[21%]" />

				{/* Inner Circle */}
				<circle
					cx="50"
					cy="50"
					r="40"
					className="fill-none stroke-current transition-all duration-1000"
					style={{
						strokeWidth: 1,
						strokeDasharray: 250,
						strokeDashoffset: isAnimating ? 0 : 250,
						opacity: 0.1
					}}
				/>
			</svg>
		</div>
	);
} 