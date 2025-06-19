import { FaSpinner } from 'react-icons/fa';

export default function Spinner({ size = 'md', className = '' }) {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
		xl: 'w-16 h-16'
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<FaSpinner
				className={`${sizeClasses[size]} animate-spin text-blue-500`}
			/>
		</div>
	);
} 