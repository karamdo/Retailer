import { FaStar, FaStarHalfAlt, FaHeart } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product, darkMode }) {
	const { addToWishlist, removeFromWishlist, isInWishlist } = useShop();
	const isWishlisted = isInWishlist(product.id);

	const handleWishlistClick = (e) => {
		e.preventDefault(); // Prevent navigation when clicking the wishlist button
		e.stopPropagation(); // Prevent event bubbling
		if (isWishlisted) {
			removeFromWishlist(product.id);
		} else {
			addToWishlist(product);
		}
	};

	// Calculate discounted price
	const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

	return (
		<div className={`group relative rounded-lg overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
			} shadow-lg hover:shadow-xl`}>
			{/* Wishlist Button */}
			<button
				onClick={handleWishlistClick}
				className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-300 ${darkMode
					? 'bg-gray-700 hover:bg-gray-600'
					: 'bg-white hover:bg-gray-100'
					} shadow-md ${isWishlisted ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-400'
					} hover:text-red-500`}
			>
				<FaHeart className="w-5 h-5" />
			</button>

			{/* Discount Badge */}
			{product.discountPercentage > 0 && (
				<div className="absolute top-2 left-2 z-10">
					<span className={`px-2 py-1 text-xs font-bold rounded-full ${darkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}>
						-{product.discountPercentage.toFixed(0)}%
					</span>
				</div>
			)}

			{/* Product Image */}
			<div className="relative aspect-square overflow-hidden">
				<img
					src={product.images?.[0] || product.thumbnail}
					alt={product.title}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			{/* Product Info */}
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.title}</h3>

				{/* Brand */}
				{product.brand && (
					<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
						{product.brand}
					</p>
				)}

				{/* Rating */}
				<div className="flex items-center mb-2">
					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<span key={i} className="text-yellow-400">
								{i < Math.floor(product.rating) ? (
									<FaStar />
								) : i < Math.ceil(product.rating) ? (
									<FaStarHalfAlt />
								) : (
									<FaStar className="text-gray-300" />
								)}
							</span>
						))}
					</div>
					<span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
						({product.rating.toFixed(1)})
					</span>
				</div>

				{/* Price and Category */}
				<div className="flex justify-between items-center">
					<div className="flex flex-col">
						{product.discountPercentage > 0 ? (
							<>
								<span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
									${discountedPrice.toFixed(2)}
								</span>
								<span className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
									${product.price.toFixed(2)}
								</span>
							</>
						) : (
							<span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
								${product.price.toFixed(2)}
							</span>
						)}
					</div>
					<span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
						{product.category}
					</span>
				</div>

				{/* Stock Status */}
				<div className="mt-2">
					<span className={`text-xs ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
						{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
					</span>
				</div>
			</div>
		</div>
	);
} 