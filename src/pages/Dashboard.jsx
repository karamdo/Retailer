import { useState } from 'react';
import { FaBox, FaUser, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import { useDarkMode } from '../context/ThemeContext';

// Mock user data
const mockUser = {
	name: 'John Doe',
	email: 'john@example.com',
	joinDate: 'January 2024',
};

// Mock order history
const mockOrders = [
	{
		id: 'ORD001',
		date: '2024-02-15',
		total: 249.98,
		status: 'Delivered',
		items: [
			{ name: 'Product 1', quantity: 1, price: 99.99 },
			{ name: 'Product 2', quantity: 1, price: 149.99 },
		],
	},
	{
		id: 'ORD002',
		date: '2024-02-10',
		total: 99.99,
		status: 'Processing',
		items: [
			{ name: 'Product 3', quantity: 1, price: 99.99 },
		],
	},
];

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState('orders');
	const { darkMode } = useDarkMode();

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				<button
					className={`flex items-center space-x-2 px-4 py-2 rounded-lg mb-8 ml-auto ${darkMode
						? 'bg-red-600 hover:bg-red-700'
						: 'bg-red-500 hover:bg-red-600'
						} text-white`}
				>
					<FaSignOutAlt />
					<span>Sign Out</span>
				</button>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
							<div className="text-center mb-6">
								<div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
								<h2 className="text-xl font-semibold">{mockUser.name}</h2>
								<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
									{mockUser.email}
								</p>
								<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
									Member since {mockUser.joinDate}
								</p>
							</div>

							<nav>
								<button
									onClick={() => setActiveTab('orders')}
									className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === 'orders'
										? darkMode
											? 'bg-gray-700 text-white'
											: 'bg-blue-500 text-white'
										: darkMode
											? 'hover:bg-gray-700'
											: 'hover:bg-gray-100'
										}`}
								>
									<FaBox />
									<span>Orders</span>
								</button>
								<button
									onClick={() => setActiveTab('profile')}
									className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === 'profile'
										? darkMode
											? 'bg-gray-700 text-white'
											: 'bg-blue-500 text-white'
										: darkMode
											? 'hover:bg-gray-700'
											: 'hover:bg-gray-100'
										}`}
								>
									<FaUser />
									<span>Profile</span>
								</button>
								<button
									onClick={() => setActiveTab('payment')}
									className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${activeTab === 'payment'
										? darkMode
											? 'bg-gray-700 text-white'
											: 'bg-blue-500 text-white'
										: darkMode
											? 'hover:bg-gray-700'
											: 'hover:bg-gray-100'
										}`}
								>
									<FaCreditCard />
									<span>Payment Methods</span>
								</button>
							</nav>
						</div>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						{activeTab === 'orders' && (
							<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
								<h2 className="text-xl font-semibold mb-4">Order History</h2>
								<div className="space-y-4">
									{mockOrders.map((order) => (
										<div
											key={order.id}
											className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
												}`}
										>
											<div className="flex justify-between items-center mb-2">
												<div>
													<span className="font-semibold">Order {order.id}</span>
													<span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
														}`}>
														{order.date}
													</span>
												</div>
												<span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered'
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'
													}`}>
													{order.status}
												</span>
											</div>
											<div className="space-y-2">
												{order.items.map((item, index) => (
													<div key={index} className="flex justify-between text-sm">
														<span>
															{item.name} x {item.quantity}
														</span>
														<span>${item.price.toFixed(2)}</span>
													</div>
												))}
											</div>
											<div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-semibold">
												<span>Total</span>
												<span>${order.total.toFixed(2)}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === 'profile' && (
							<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
								<h2 className="text-xl font-semibold mb-4">Profile Information</h2>
								<form className="space-y-4">
									<div>
										<label className="block mb-1">Full Name</label>
										<input
											type="text"
											defaultValue={mockUser.name}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
										/>
									</div>
									<div>
										<label className="block mb-1">Email</label>
										<input
											type="email"
											defaultValue={mockUser.email}
											className={`w-full p-2 rounded-lg ${darkMode
												? 'bg-gray-700 text-white'
												: 'bg-gray-100 text-gray-800'
												}`}
										/>
									</div>
									<button
										type="submit"
										className={`px-6 py-3 rounded-lg ${darkMode
											? 'bg-blue-600 hover:bg-blue-700'
											: 'bg-blue-500 hover:bg-blue-600'
											} text-white`}
									>
										Update Profile
									</button>
								</form>
							</div>
						)}

						{activeTab === 'payment' && (
							<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
								<h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
								<div className="space-y-4">
									<div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
										}`}>
										<div className="flex justify-between items-center">
											<div className="flex items-center space-x-4">
												<FaCreditCard className="text-2xl" />
												<div>
													<p className="font-semibold">•••• •••• •••• 1234</p>
													<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
														}`}>
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
						)}
					</div>
				</div>
			</div>
		</div>
	);
} 