import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	FaShoppingCart,
	FaHeart,
	FaStar,
	FaStarHalfAlt,
	FaArrowLeft,
} from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import { showToast } from "../showToast";
import { useDarkMode } from '../context/ThemeContext';
import Spinner from '../components/Spinner';

// Mock data - In a real app, this would come from an API
const mockProducts = [
	{
		id: 1,
		name: "Premium Wireless Headphones",
		description:
			"Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and comfortable over-ear design.",
		price: 199.99,
		images: [
			"https://via.placeholder.com/600x400?text=Headphones+1",
			"https://via.placeholder.com/600x400?text=Headphones+2",
			"https://via.placeholder.com/600x400?text=Headphones+3",
		],
		rating: 4.5,
		reviews: 128,
		stock: 15,
		features: [
			"Active Noise Cancellation",
			"30-hour Battery Life",
			"Bluetooth 5.0",
			"Built-in Microphone",
			"Foldable Design",
		],
		colors: ["Black", "Silver", "Blue"],
		category: "Electronics",
	},
	// Add more mock products as needed
];

export default function ItemDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
		useShop();
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { darkMode } = useDarkMode();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProduct() {
			try {
				setLoading(true);
				const response = await fetch(`https://fakestoreapi.com/products/${id}`);
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				console.error('Error fetching product:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
				<div className="container mx-auto px-6 py-8">
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<Spinner size="xl" className="mb-4" />
							<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
								Loading product details...
							</p>
						</div>
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
						<h2 className="mb-4 text-2xl font-semibold">
							Product not found
						</h2>
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
								src={product.image}
								alt={product.name}
								className="h-[400px] w-full object-cover"
							/>
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						<div>
							<h1 className="mb-2 text-3xl font-bold">
								{product.name}
							</h1>
							<div className="mb-4 flex items-center space-x-2">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<span
											key={i}
											className="text-yellow-400"
										>
											{i < Math.floor(product.rating) ? (
												<FaStar />
											) : i <
												Math.ceil(product.rating) ? (
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
									({product.reviews} reviews)
								</span>
							</div>
							<p
								className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
							>
								${product.price.toFixed(2)}
							</p>
						</div>

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

						<div>
							<h2 className="mb-2 text-lg font-semibold">
								Features
							</h2>
							<ul
								className={`list-inside list-disc ${darkMode ? "text-gray-300" : "text-gray-600"}`}
							>
								{product.description.split(',').map((feature, index) => (
									<li key={index}>{feature}</li>
								))}
							</ul>
						</div>

						<div>
							<h2 className="mb-2 text-lg font-semibold">
								Category
							</h2>
							<p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
								{product.category}
							</p>
						</div>

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
												product.rating.count,
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

						<div className="flex space-x-4">
							<button
								onClick={handleAddToCart}
								className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-6 py-3 ${darkMode
									? "bg-blue-600 hover:bg-blue-700"
									: "bg-blue-500 hover:bg-blue-600"
									} text-white`}
							>
								<FaShoppingCart />
								<span>Add to Cart</span>
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
					</div>
				</div>
			</div>
		</div>
	);
}
