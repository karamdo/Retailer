import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	FaShoppingCart,
	FaHeart,
	FaStar,
	FaStarHalfAlt,
	FaArrowLeft,
	FaTruck,
	FaShieldAlt,
	FaBox,
	FaTag,
	FaBarcode,
	FaQrcode,
} from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import { useDarkMode } from "../context/ThemeContext";
import Spinner from "../components/Spinner";
import { useQuery } from '@tanstack/react-query';

export default function ItemDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
		useShop();
	const [quantity, setQuantity] = useState(1);
	const { darkMode } = useDarkMode();

	const { data: product, isLoading, error } = useQuery({
		queryKey: ['product', id],
		queryFn: async () => {
			const response = await fetch(`https://dummyjson.com/products/${id}`);
			if (!response.ok) throw new Error('Network response was not ok');
			return response.json();
		},
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<div
				className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
			>
				<div className="container mx-auto px-6 py-8">
					<div className="flex min-h-[400px] items-center justify-center">
						<div className="text-center">
							<Spinner size="xl" className="mb-4" />
							<p
								className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
							>
								Loading product details...
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
			>
				<div className="container mx-auto px-6 py-8">
					<div className="py-12 text-center">
						<h2 className="mb-4 text-2xl font-semibold">Error loading product</h2>
						<p className="mb-4 text-red-500">{error.message}</p>
						<button
							onClick={() => navigate(-1)}
							className={`inline-flex items-center rounded-lg px-6 py-3 ${darkMode
								? "bg-blue-600 hover:bg-blue-700"
								: "bg-blue-500 hover:bg-blue-600"
								} text-white transition-colors duration-200`}
						>
							<FaArrowLeft className="mr-2" />
							Back to Shop
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div
				className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
			>
				<div className="container mx-auto px-6 py-8">
					<div className="py-12 text-center">
						<h2 className="mb-4 text-2xl font-semibold">Product not found</h2>
						<button
							onClick={() => navigate(-1)}
							className={`inline-flex items-center rounded-lg px-6 py-3 ${darkMode
								? "bg-blue-600 hover:bg-blue-700"
								: "bg-blue-500 hover:bg-blue-600"
								} text-white transition-colors duration-200`}
						>
							<FaArrowLeft className="mr-2" />
							Back to Shop
						</button>
					</div>
				</div>
			</div>
		);
	}

	const handleAddToCart = () => {
		addToCart(product, quantity);
	};

	const handleWishlistClick = () => {
		if (isInWishlist(product.id)) {
			removeFromWishlist(product.id);
		} else {
			addToWishlist(product);
		}
	};

	// Calculate discounted price
	const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

	return (
		<div
			className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
		>
			<div className="container mx-auto px-6 py-8">
				{/* Back Button */}
				<button
					onClick={() => navigate(-1)}
					className={`mb-6 flex items-center space-x-2 ${darkMode
						? "text-gray-300 hover:text-white"
						: "text-gray-600 hover:text-gray-800"
						}`}
				>
					<FaArrowLeft />
					<span>Back to Shop</span>
				</button>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Image Gallery */}
					<div className="space-y-4">
						<div
							className={`overflow-hidden rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
						>
							<img
								src={product.images?.[0] || product.thumbnail}
								alt={product.title}
								className="h-[400px] w-full object-cover"
							/>
						</div>
						{/* Additional Images */}
						{product.images && product.images.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{product.images.slice(1).map((image, index) => (
									<div
										key={index}
										className={`overflow-hidden rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
									>
										<img
											src={image}
											alt={`${product.title} ${index + 2}`}
											className="h-20 w-full object-cover"
										/>
									</div>
								))}
							</div>
						)}

						{/* Reviews */}
						{product.reviews && product.reviews.length > 0 && (
							<div>
								<h2 className="mb-3 text-lg font-semibold">Customer Reviews</h2>
								<div className="space-y-3 max-h-64 overflow-y-auto">
									{product.reviews.map((review, index) => (
										<div key={index} className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center space-x-2">
													<div className="flex items-center">
														{[...Array(5)].map((_, i) => (
															<FaStar
																key={i}
																className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
																size={12}
															/>
														))}
													</div>
													<span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
														{review.rating}/5
													</span>
												</div>
												<span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
													{new Date(review.date).toLocaleDateString()}
												</span>
											</div>
											<p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
												"{review.comment}"
											</p>
											<p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
												- {review.reviewerName}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Meta Information */}
						{product.meta && (
							<div className={`grid grid-cols-1 gap-4 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
								<h2 className="text-lg font-semibold mb-3">Product Information</h2>

								{/* Barcode */}
								{product.meta.barcode && (
									<div className="flex items-center space-x-3">
										<FaBarcode className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} />
										<div>
											<span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Barcode:</span>
											<p className="text-sm font-mono">{product.meta.barcode}</p>
										</div>
									</div>
								)}

								{/* QR Code */}
								{product.meta.qrCode && (
									<div className="flex items-center space-x-3">
										<FaQrcode className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} />
										<div>
											<span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>QR Code:</span>
											<a
												href={product.meta.qrCode}
												target="_blank"
												rel="noopener noreferrer"
												className={`text-sm text-blue-500 hover:underline`}
											>
												View QR Code
											</a>
										</div>
									</div>
								)}

								{/* Created Date */}
								{product.meta.createdAt && (
									<div className="flex justify-between">
										<span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Created:</span>
										<span className="text-sm">{new Date(product.meta.createdAt).toLocaleDateString()}</span>
									</div>
								)}
							</div>
						)}

					</div>

					{/* Product Info */}
					<div className="space-y-6">
						<div>
							<h1 className="mb-2 text-3xl font-bold">
								{product.title}
							</h1>

							{/* Brand */}
							{product.brand && (
								<p className={`mb-2 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
									Brand: <span className="font-semibold">{product.brand}</span>
								</p>
							)}

							{/* Rating */}
							<div className="mb-4 flex items-center space-x-2">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<span
											key={i}
											className="text-yellow-400"
										>
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
								<span
									className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
								>
									({product.rating.toFixed(1)} stars)
								</span>
							</div>

							{/* Price */}
							<div className="mb-4">
								{product.discountPercentage > 0 ? (
									<div className="flex items-center space-x-3">
										<p className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
											${discountedPrice.toFixed(2)}
										</p>
										<p className={`text-xl line-through ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
											${product.price.toFixed(2)}
										</p>
										<span className={`px-2 py-1 text-sm font-bold rounded-full ${darkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}>
											-{product.discountPercentage.toFixed(0)}%
										</span>
									</div>
								) : (
									<p className={`text-3xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
										${product.price.toFixed(2)}
									</p>
								)}
							</div>

							{/* SKU */}
							{product.sku && (
								<p className={`mb-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
									SKU: {product.sku}
								</p>
							)}
						</div>

						{/* Description */}
						<div>
							<h2 className="mb-2 text-lg font-semibold">
								Description
							</h2>
							<p
								className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
							>
								{product.description}
							</p>
						</div>

						{/* Tags */}
						{product.tags && product.tags.length > 0 && (
							<div>
								<h2 className="mb-2 text-lg font-semibold">Tags</h2>
								<div className="flex flex-wrap gap-2">
									{product.tags.map((tag, index) => (
										<span
											key={index}
											className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						)}


						{/* Quantity Selector */}
						<div>
							<h2 className="mb-2 text-lg font-semibold">
								Quantity
							</h2>
							<div className="flex items-center space-x-4">
								<button
									onClick={() =>
										setQuantity(Math.max(1, quantity - 1))
									}
									className={`rounded-lg px-3 py-1 ${darkMode
										? "bg-gray-700 hover:bg-gray-600"
										: "bg-gray-200 hover:bg-gray-300"
										}`}
								>
									-
								</button>
								<span className="w-12 text-center">
									{quantity}
								</span>
								<button
									onClick={() =>
										setQuantity(
											Math.min(
												product.stock,
												quantity + 1,
											),
										)
									}
									className={`rounded-lg px-3 py-1 ${darkMode
										? "bg-gray-700 hover:bg-gray-600"
										: "bg-gray-200 hover:bg-gray-300"
										}`}
								>
									+
								</button>
								<span
									className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
								>
									{product.stock} available
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex space-x-4">
							<button
								onClick={handleAddToCart}
								disabled={product.stock === 0}
								className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-6 py-3 ${product.stock === 0
									? "bg-gray-400 cursor-not-allowed"
									: darkMode
										? "bg-blue-600 hover:bg-blue-700"
										: "bg-blue-500 hover:bg-blue-600"
									} text-white transition-colors`}
							>
								<FaShoppingCart />
								<span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
							</button>
							<button
								onClick={handleWishlistClick}
								className={`rounded-lg px-6 py-3 ${darkMode
									? "bg-gray-700 hover:bg-gray-600"
									: "bg-gray-200 hover:bg-gray-300"
									} ${isInWishlist(product.id) ? "text-red-500" : ""}`}
							>
								<FaHeart
									className={
										isInWishlist(product.id)
											? "text-red-500"
											: ""
									}
								/>
							</button>
						</div>

						{/* Product Details */}
						<div className={`grid grid-cols-1 gap-4 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
							<h2 className="text-lg font-semibold mb-3">Product Details</h2>

							{/* Category */}
							<div className="flex justify-between">
								<span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Category:</span>
								<span className="font-medium">{product.category}</span>
							</div>

							{/* Weight */}
							{product.weight && (
								<div className="flex justify-between">
									<span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Weight:</span>
									<span className="font-medium">{product.weight}g</span>
								</div>
							)}

							{/* Dimensions */}
							{product.dimensions && (
								<div className="flex justify-between">
									<span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Dimensions:</span>
									<span className="font-medium">
										{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
									</span>
								</div>
							)}

							{/* Stock */}
							<div className="flex justify-between">
								<span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Stock:</span>
								<span className={`font-medium ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
									{product.stock} available
								</span>
							</div>

							{/* Minimum Order Quantity */}
							{product.minimumOrderQuantity && (
								<div className="flex justify-between">
									<span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Min Order:</span>
									<span className="font-medium">{product.minimumOrderQuantity} units</span>
								</div>
							)}
						</div>

						{/* Shipping & Warranty Info */}
						<div className={`grid grid-cols-1 gap-4 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
							<h2 className="text-lg font-semibold mb-3">Shipping & Warranty</h2>

							{/* Shipping Information */}
							{product.shippingInformation && (
								<div className="flex items-start space-x-3">
									<FaTruck className={`mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
									<div>
										<span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Shipping:</span>
										<p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{product.shippingInformation}</p>
									</div>
								</div>
							)}

							{/* Warranty Information */}
							{product.warrantyInformation && (
								<div className="flex items-start space-x-3">
									<FaShieldAlt className={`mt-1 ${darkMode ? "text-green-400" : "text-green-600"}`} />
									<div>
										<span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Warranty:</span>
										<p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{product.warrantyInformation}</p>
									</div>
								</div>
							)}

							{/* Return Policy */}
							{product.returnPolicy && (
								<div className="flex items-start space-x-3">
									<FaBox className={`mt-1 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
									<div>
										<span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Returns:</span>
										<p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{product.returnPolicy}</p>
									</div>
								</div>
							)}
						</div>



					</div>
				</div>
			</div>
		</div>
	);
}
