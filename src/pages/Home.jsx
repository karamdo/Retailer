import { Link } from 'react-router-dom';

export default function Home({ darkMode }) {
	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				{/* Hero Section */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">Welcome to ShopMVP</h1>
					<p className="text-lg mb-8">
						Your one-stop shop for all your needs. Discover amazing products at great prices.
					</p>
					<Link
						to="/shop"
						className={`inline-block px-6 py-3 rounded-lg ${darkMode
								? 'bg-blue-600 hover:bg-blue-700 text-white'
								: 'bg-blue-500 hover:bg-blue-600 text-white'
							} transition-colors`}
					>
						Start Shopping
					</Link>
				</div>

				{/* Features Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					<div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
						} shadow-lg`}>
						<h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
						<p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
							Browse through our extensive collection of products with ease.
						</p>
					</div>
					<div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
						} shadow-lg`}>
						<h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
						<p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
							Shop with confidence with our secure payment system.
						</p>
					</div>
					<div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
						} shadow-lg`}>
						<h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
						<p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
							Get your products delivered quickly to your doorstep.
						</p>
					</div>
				</div>

				{/* Newsletter Section */}
				<div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
					} shadow-lg text-center`}>
					<h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
					<p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
						Subscribe to our newsletter for the latest products and offers.
					</p>
					<div className="flex max-w-md mx-auto">
						<input
							type="email"
							placeholder="Enter your email"
							className={`flex-1 px-4 py-2 rounded-l-lg ${darkMode
									? 'bg-gray-700 text-white placeholder-gray-400'
									: 'bg-gray-100 text-gray-800 placeholder-gray-500'
								} focus:outline-none`}
						/>
						<button
							className={`px-6 py-2 rounded-r-lg ${darkMode
									? 'bg-blue-600 hover:bg-blue-700'
									: 'bg-blue-500 hover:bg-blue-600'
								} text-white transition-colors`}
						>
							Subscribe
						</button>
					</div>
				</div>
			</div>
		</div>
	);
} 