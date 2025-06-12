import { useShop } from '../context/ShopContext';
import { FaArrowLeft, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Wishlist({ darkMode }) {
	const { wishlist, removeFromWishlist, addToCart } = useShop();

	if (wishlist.length === 0) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
				<div className="container mx-auto px-6 py-8">
					<div className="text-center py-12">
						<h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
						<p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
							Save items you love to your wishlist and they'll appear here.
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{wishlist.map((item) => (
						<div
							key={item.id}
							className={`group relative rounded-lg overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
								} shadow-lg hover:shadow-xl`}
						>
							{/* Product Image */}
							<Link to={`/item/${item.id}`} className="block relative aspect-square overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</Link>

							{/* Product Info */}
							<div className="p-4">
								<Link
									to={`/item/${item.id}`}
									className={`font-semibold text-lg mb-1 line-clamp-1 hover:underline ${darkMode ? 'text-white' : 'text-gray-800'
										}`}
								>
									{item.name}
								</Link>
								<p className={`text-sm mb-2 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
									{item.description}
								</p>

								{/* Price */}
								<div className="flex justify-between items-center mb-4">
									<span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
										${item.price.toFixed(2)}
									</span>
									<span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
										{item.category}
									</span>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-2">
									<button
										onClick={() => addToCart(item)}
										className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${darkMode
											? 'bg-blue-600 hover:bg-blue-700'
											: 'bg-blue-500 hover:bg-blue-600'
											} text-white transition-colors duration-200`}
									>
										<FaShoppingCart />
										Add to Cart
									</button>
									<button
										onClick={() => removeFromWishlist(item.id)}
										className={`p-2 rounded-lg ${darkMode
											? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-red-500'
											: 'bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-red-600'
											} transition-colors duration-200`}
									>
										<FaTrash />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
} 