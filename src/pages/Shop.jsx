import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FaFilter } from 'react-icons/fa';
import { useDarkMode } from '../context/ThemeContext';

// Mock data - In a real app, this would come from an API
const mockProducts = [
	{
		id: 1,
		name: 'Premium Wireless Headphones',
		description: 'Experience crystal-clear sound with our premium wireless headphones.',
		price: 199.99,
		image: 'https://via.placeholder.com/300x300?text=Headphones',
		rating: 4.5,
		reviews: 128,
		category: 'Electronics'
	},
	{
		id: 2,
		name: 'Smart Watch Series 5',
		description: 'Track your fitness and stay connected with our latest smart watch.',
		price: 299.99,
		image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
		rating: 4.8,
		reviews: 256,
		category: 'Electronics'
	},
	{
		id: 3,
		name: 'Professional Camera Kit',
		description: 'Capture stunning photos with our professional camera kit.',
		price: 899.99,
		image: 'https://via.placeholder.com/300x300?text=Camera',
		rating: 4.7,
		reviews: 89,
		category: 'Electronics'
	},
	{
		id: 4,
		name: 'Wireless Earbuds',
		description: 'Enjoy music on the go with our comfortable wireless earbuds.',
		price: 79.99,
		image: 'https://via.placeholder.com/300x300?text=Earbuds',
		rating: 4.3,
		reviews: 156,
		category: 'Electronics'
	},
	{
		id: 5,
		name: 'Gaming Laptop',
		description: 'Powerful gaming laptop for the ultimate gaming experience.',
		price: 1299.99,
		image: 'https://via.placeholder.com/300x300?text=Laptop',
		rating: 4.9,
		reviews: 203,
		category: 'Electronics'
	},
	{
		id: 6,
		name: 'Smart Home Hub',
		description: 'Control your home with our advanced smart home hub.',
		price: 149.99,
		image: 'https://via.placeholder.com/300x300?text=Smart+Hub',
		rating: 4.4,
		reviews: 112,
		category: 'Electronics'
	}
];

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

export default function Shop() {
	const { darkMode } = useDarkMode();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);

	// Calculate min and max prices from products
	const minPrice = Math.min(...mockProducts.map(p => p.price));
	const maxPrice = Math.max(...mockProducts.map(p => p.price));

	useEffect(() => {
		// Filter products based on category and price range
		const filtered = mockProducts.filter(product => {
			const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
			const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
			return categoryMatch && priceMatch;
		});
		setFilteredProducts(filtered);
	}, [selectedCategory, priceRange]);

	const handlePriceChange = (e, type) => {
		const value = parseFloat(e.target.value);
		setPriceRange(prev => ({
			...prev,
			[type]: value
		}));
	};

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8 relative">
				{/* Products Grid */}
				<div className="pr-80"> {/* Add padding to prevent overlap with fixed filters */}
					{filteredProducts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map(product => (
								<Link to={`/item/${product.id}`} key={product.id} className="block">
									<ProductCard
										product={product}
										darkMode={darkMode}
									/>
								</Link>
							))}
						</div>
					) : (
						<div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
							No products found matching your criteria
						</div>
					)}
				</div>

				{/* Fixed Filters Section */}
				<div className={`fixed top-20 right-0 w-72 p-4 h-[calc(100vh-5rem)] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
					<div className="flex items-center mb-2 sticky top-0 bg-inherit pb-2">
						<FaFilter className="mr-2 text-sm" />
						<h2 className="text-lg font-semibold">Filters</h2>
					</div>

					{/* Categories */}
					<div className="mb-3">
						<h3 className="text-sm font-medium mb-2">Categories</h3>
						<div className="flex flex-col gap-1">
							{categories.map(category => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-2 py-1 text-sm rounded text-left ${selectedCategory === category
										? darkMode
											? 'bg-blue-600 text-white'
											: 'bg-blue-500 text-white'
										: darkMode
											? 'bg-gray-700 hover:bg-gray-600'
											: 'bg-gray-200 hover:bg-gray-300'
										}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Price Range Slider */}
					<div>
						<h3 className="text-sm font-medium mb-2">Price Range</h3>
						<div className="space-y-2">
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<span className="text-xs w-16">Min: ${priceRange.min.toFixed(2)}</span>
									<input
										type="range"
										min={minPrice}
										max={maxPrice}
										value={priceRange.min}
										onChange={(e) => handlePriceChange(e, 'min')}
										className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
									/>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs w-16">Max: ${priceRange.max.toFixed(2)}</span>
									<input
										type="range"
										min={minPrice}
										max={maxPrice}
										value={priceRange.max}
										onChange={(e) => handlePriceChange(e, 'max')}
										className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}