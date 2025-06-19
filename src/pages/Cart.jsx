import { useShop } from '../context/ShopContext';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/ThemeContext';
import CartCard from '../components/CartCard';

export default function Cart() {
	const { cart, cartTotal, clearCart } = useShop();
	const navigate = useNavigate();
	const { darkMode } = useDarkMode();

	if (cart.length === 0) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
				<div className="container mx-auto px-6 py-8">
					<div className="text-center py-12">
						<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
						<p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
							Looks like you haven't added any items to your cart yet.
						</p>
						<Link
							to="/Retailer/shop"
							className={`inline-flex items-center px-6 py-3 rounded-lg ${darkMode
								? 'bg-blue-600 hover:bg-blue-700'
								: 'bg-blue-500 hover:bg-blue-600'
								} text-white transition-colors duration-200`}
						>
							<FaArrowLeft className="mr-2" />
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				<div className="flex justify-between items-center mb-8">
					<Link
						to="/Retailer/shop"
						className={`inline-flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
							}`}
					>
						<FaArrowLeft className="mr-2" />
						Continue Shopping
					</Link>
					<button
						onClick={clearCart}
						className={`px-4 py-2 rounded-lg ${darkMode
							? 'bg-red-600 hover:bg-red-700'
							: 'bg-red-500 hover:bg-red-600'
							} text-white transition-colors duration-200`}
					>
						Clear Cart
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<CartCard darkMode={darkMode} />

					{/* Order Summary */}
					<div className={`lg:col-span-1 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
						} shadow-lg h-fit`}>
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
						<div className="space-y-4">
							<div className="flex justify-between">
								<span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
								<span className="font-semibold">${cartTotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
								<span className="font-semibold">Free</span>
							</div>
							<div className="border-t pt-4 mt-4">
								<div className="flex justify-between mb-4">
									<span className="font-semibold">Total</span>
									<span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
								</div>
								<button
									onClick={() => navigate('/Retailer/checkout')}
									className={`w-full py-3 rounded-lg ${darkMode
										? 'bg-blue-600 hover:bg-blue-700'
										: 'bg-blue-500 hover:bg-blue-600'
										} text-white transition-colors duration-200`}
								>
									Proceed to Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
} 