import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { FaArrowRight, FaStar, FaFire, FaShoppingCart } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Home() {
	const { darkMode } = useDarkMode();

	// Fetch products for best selling and new items
	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const response = await fetch('https://dummyjson.com/products');
			if (!response.ok) throw new Error('Network response was not ok');
			return response.json();
		},
	});

	const products = data?.products || [];

	// Get best selling products (top rated)
	const bestSellingProducts = products
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 6);

	// Get new products (recently added - using id as proxy for newness)
	const newProducts = products
		.sort((a, b) => b.id - a.id)
		.slice(0, 6);

	if (isLoading) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<Spinner size="xl" className="mb-4" />
						<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
							Loading amazing products...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
				<div className="text-center py-12">
					<p className="text-red-500">Error loading products: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
		>
			{/* Hero Banner Section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
				<div className="relative container mx-auto px-6 py-20">
					<div className="text-center text-white">
						<h1 className="mb-6 text-6xl font-bold animate-fade-in-up">
							Welcome to <span className="text-yellow-300">Retailer</span>
						</h1>
						<p className="mb-8 text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
							Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
							<Link
								to="/Retailer/shop"
								className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-yellow-300 hover:text-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
							>
								Start Shopping
								<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/Retailer/contact"
								className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
							>
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section with Enhanced Visual Effects */}
			<div className="container mx-auto px-6 py-16">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
						Why Choose <span className="text-blue-600">Retailer</span>?
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400 animate-fade-in-up animation-delay-200">
						Experience shopping like never before
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div
						className={`group rounded-2xl p-8 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
							} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700`}
					>
						<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<FaStar className="text-2xl text-blue-600" />
						</div>
						<h3 className="mb-4 text-2xl font-semibold group-hover:text-blue-600 transition-colors">
							Premium Quality
						</h3>
						<p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
							} group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors`}>
							Browse through our carefully curated collection of premium products with guaranteed quality.
						</p>
					</div>

					<div
						className={`group rounded-2xl p-8 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
							} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700`}
					>
						<div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<h3 className="mb-4 text-2xl font-semibold group-hover:text-green-600 transition-colors">
							Secure Checkout
						</h3>
						<p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
							} group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors`}>
							Shop with complete confidence using our bank-level security and encrypted payment system.
						</p>
					</div>

					<div
						className={`group rounded-2xl p-8 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
							} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700`}
					>
						<div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<h3 className="mb-4 text-2xl font-semibold group-hover:text-purple-600 transition-colors">
							Lightning Fast Delivery
						</h3>
						<p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"
							} group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors`}>
							Get your favorite products delivered to your doorstep in record time with our express shipping.
						</p>
					</div>
				</div>
			</div>

			{/* Best Selling Products Section */}
			<div className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
				<div className="container mx-auto px-6">
					<div className="flex items-center justify-between mb-12">
						<div className="flex items-center">
							<FaFire className="text-3xl text-orange-500 mr-4" />
							<h2 className="text-4xl font-bold">Best Selling Products</h2>
						</div>
						<Link
							to="/Retailer/shop"
							className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
						>
							View All
							<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>

					<div className="relative">
						{/* Left fade gradient */}
						<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800 z-10 pointer-events-none"></div>
						{/* Right fade gradient */}
						<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-800 z-10 pointer-events-none"></div>

						<div className="flex overflow-x-auto scrollbar-hide horizontal-scroll gap-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
							{bestSellingProducts.map((product, index) => (
								<div key={product.id} className="flex-shrink-0 w-64 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
									<Link to={`/Retailer/item/${product.id}`} className="block">
										<ProductCard
											product={product}
											darkMode={darkMode}
										/>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* New Products Section */}
			<div className="py-16">
				<div className="container mx-auto px-6">
					<div className="flex items-center justify-between mb-12">
						<div className="flex items-center">
							<FaShoppingCart className="text-3xl text-pink-500 mr-4" />
							<h2 className="text-4xl font-bold">New Arrivals</h2>
						</div>
						<Link
							to="/Retailer/shop"
							className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
						>
							View All
							<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>

					<div className="relative">
						{/* Left fade gradient */}
						<div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>
						{/* Right fade gradient */}
						<div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>

						<div className="flex overflow-x-auto scrollbar-hide horizontal-scroll gap-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
							{newProducts.map((product, index) => (
								<div key={product.id} className="flex-shrink-0 w-64 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
									<Link to={`/Retailer/item/${product.id}`} className="block">
										<ProductCard
											product={product}
											darkMode={darkMode}
										/>
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Call to Action Section */}
			<div className={`py-20 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join thousands of satisfied customers and discover your next favorite product today!
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/Retailer/shop"
							className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							Browse Products
							<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
						</Link>
						<Link
							to="/Retailer/signup"
							className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
						>
							Create Account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
