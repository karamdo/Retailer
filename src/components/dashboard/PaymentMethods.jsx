import { FaCreditCard } from 'react-icons/fa';
import { useDarkMode } from '../../context/ThemeContext';

export default function PaymentMethods() {
	const { darkMode } = useDarkMode();

	return (
		<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
			<h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
			<div className="space-y-4">
				<div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4">
							<FaCreditCard className="text-2xl" />
							<div>
								<p className="font-semibold">•••• •••• •••• 1234</p>
								<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
									Expires 12/25
								</p>
							</div>
						</div>
						<button
							className={`px-4 py-2 rounded-lg ${darkMode
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-red-500 hover:bg-red-600'
								} text-white`}
						>
							Remove
						</button>
					</div>
				</div>
				<button
					className={`w-full px-6 py-3 rounded-lg ${darkMode
						? 'bg-blue-600 hover:bg-blue-700'
						: 'bg-blue-500 hover:bg-blue-600'
						} text-white`}
				>
					Add New Payment Method
				</button>
			</div>
		</div>
	);
}