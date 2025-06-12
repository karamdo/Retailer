import { useShop } from '../context/ShopContext';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ darkMode }) {
	const { cart, cartTotal, removeFromCart, updateCartItemQuantity, clearCart } = useShop();
	const navigate = useNavigate();

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
							to="/shop"
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
						to="/shop"
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
					<div className="lg:col-span-2 space-y-4">
						{cart.map((item) => (
							<div
								key={`${item.id}-${item.color}`}
								className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
									} shadow-lg flex items-center gap-4`}
							>
								{/* Product Image */}
								<Link to={`/item/${item.id}`} className="flex-shrink-0">
									<img
										src={item.image}
										alt={item.name}
										className="w-24 h-24 object-cover rounded-lg"
									/>
								</Link>

								{/* Product Info */}
								<div className="flex-grow">
									<Link
										to={`/item/${item.id}`}
										className={`font-semibold hover:underline ${darkMode ? 'text-white' : 'text-gray-800'
											}`}
									>
										{item.name}
									</Link>
									{item.color && (
										<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
											Color: {item.color}
										</p>
									)}
									<p className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
										${item.price.toFixed(2)}
									</p>
								</div>

								{/* Quantity Controls */}
								<div className="flex items-center gap-4">
									<div className="flex items-center border rounded-lg overflow-hidden">
										<button
											onClick={() => updateCartItemQuantity(item.id, item.quantity - 1, item.color)}
											className={`px-3 py-1 ${darkMode
												? 'bg-gray-700 hover:bg-gray-600'
												: 'bg-gray-200 hover:bg-gray-300'
												}`}
										>
											-
										</button>
										<span className="px-4 py-1">{item.quantity}</span>
										<button
											onClick={() => updateCartItemQuantity(item.id, item.quantity + 1, item.color)}
											className={`px-3 py-1 ${darkMode
												? 'bg-gray-700 hover:bg-gray-600'
												: 'bg-gray-200 hover:bg-gray-300'
												}`}
										>
											+
										</button>
									</div>

									{/* Remove Button */}
									<button
										onClick={() => removeFromCart(item.id, item.color)}
										className={`p-2 rounded-lg ${darkMode
											? 'text-gray-400 hover:text-red-500'
											: 'text-gray-500 hover:text-red-600'
											} transition-colors duration-200`}
									>
										<FaTrash />
									</button>
								</div>
							</div>
						))}
					</div>

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
									onClick={() => navigate('/checkout')}
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