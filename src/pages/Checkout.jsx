import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/ThemeContext';

export default function Checkout() {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const { darkMode } = useDarkMode();
	const [formData, setFormData] = useState({
		shipping: {
			fullName: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
		},
		payment: {
			cardNumber: '',
			cardName: '',
			expiryDate: '',
			cvv: '',
		},
	});

	const handleInputChange = (section, field, value) => {
		setFormData({
			...formData,
			[section]: {
				...formData[section],
				[field]: value,
			},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (step === 1) {
			setStep(2);
		} else {
			// In a real app, you would process the payment here
			alert('Order placed successfully!');
			navigate('/dashboard');
		}
	};

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				{/* Progress Steps */}
				<div className="mb-8">
					<div className="flex items-center justify-center space-x-4">
						<div className={`flex items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
							<div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
								}`}>
								1
							</div>
							<span className="ml-2">Shipping</span>
						</div>
						<div className="flex-1 h-1 bg-gray-200">
							<div className={`h-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
						</div>
						<div className={`flex items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
							<div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
								}`}>
								2
							</div>
							<span className="ml-2">Payment</span>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
					{step === 1 ? (
						// Shipping Information
						<div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
							<h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
							<div className="space-y-4">
								<div>
									<label className="block mb-1">Full Name</label>
									<input
										type="text"
										value={formData.shipping.fullName}
										onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
										className={`w-full p-2 rounded-lg ${darkMode
											? 'bg-gray-700 text-white'
											: 'bg-gray-100 text-gray-800'
											}`}
										required
									/>
								</div>
								<div>
									<label className="block mb-1">Address</label>
									<input
										type="text"
										value={formData.shipping.address}
										onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
										className={`w-full p-2 rounded-lg ${darkMode
											? 'bg-gray-700 text-white'
											: 'bg-gray-100 text-gray-800'
											}`}
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block mb-1">City</label>
										<input
											type="text"
											value={formData.shipping.city}
											onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
									<div>
										<label className="block mb-1">State</label>
										<input
											type="text"
											value={formData.shipping.state}
											onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block mb-1">ZIP Code</label>
										<input
											type="text"
											value={formData.shipping.zipCode}
											onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
									<div>
										<label className="block mb-1">Country</label>
										<input
											type="text"
											value={formData.shipping.country}
											onChange={(e) => handleInputChange('shipping', 'country', e.target.value)}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
								</div>
							</div>
						</div>
					) : (
						// Payment Information
						<div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
							<h2 className="text-xl font-semibold mb-4">Payment Information</h2>
							<div className="space-y-4">
								<div>
									<label className="block mb-1">Card Number</label>
									<input
										type="text"
										value={formData.payment.cardNumber}
										onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
										placeholder="1234 5678 9012 3456"
										className={`w-full p-2 rounded-lg ${darkMode
											? 'bg-gray-700 text-white'
											: 'bg-gray-100 text-gray-800'
											}`}
										required
									/>
								</div>
								<div>
									<label className="block mb-1">Name on Card</label>
									<input
										type="text"
										value={formData.payment.cardName}
										onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
										className={`w-full p-2 rounded-lg ${darkMode
											? 'bg-gray-700 text-white'
											: 'bg-gray-100 text-gray-800'
											}`}
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block mb-1">Expiry Date</label>
										<input
											type="text"
											value={formData.payment.expiryDate}
											onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
											placeholder="MM/YY"
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
									<div>
										<label className="block mb-1">CVV</label>
										<input
											type="text"
											value={formData.payment.cvv}
											onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
											placeholder="123"
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
											required
										/>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="mt-6 flex justify-between">
						{step === 2 && (
							<button
								type="button"
								onClick={() => setStep(1)}
								className={`px-6 py-3 rounded-lg ${darkMode
									? 'bg-gray-700 hover:bg-gray-600'
									: 'bg-gray-200 hover:bg-gray-300'
									}`}
							>
								Back
							</button>
						)}
						<button
							type="submit"
							className={`px-6 py-3 rounded-lg ${darkMode
								? 'bg-blue-600 hover:bg-blue-700'
								: 'bg-blue-500 hover:bg-blue-600'
								} text-white ml-auto`}
						>
							{step === 1 ? 'Continue to Payment' : 'Place Order'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
} 