import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";


export default function Filter({ darkMode, setFilteredProducts, Products }) {
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
	const [selectedCategory, setSelectedCategory] = useState('All');
	const categories = new Set(['All', ...Products.map(p => p.category)]);

	const minPrice = Math.min(...Products.map(p => p.price));
	const maxPrice = Math.max(...Products.map(p => p.price));

	useEffect(() => {
		// Filter products based on category and price range
		const filtered = Products.filter(product => {
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
		<div className={`fixed top-20 right-0 w-72 p-4 h-[calc(100vh-5rem)] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
			<div className="flex items-center mb-2 sticky top-0 bg-inherit pb-2">
				<FaFilter className="mr-2 text-sm" />
				<h2 className="text-lg font-semibold">Filters</h2>
			</div>

			{/* Categories */}
			<div className="mb-3">
				<h3 className="text-sm font-medium mb-2">Categories</h3>
				<div className="flex flex-col gap-1">
					{Array.from(categories).map(category => (
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
						<div className="flex items-center">
							<div className="flex justify-between w-full">
								<span className="text-xs w-32">Min: ${priceRange.min.toFixed(2)}</span>
								<span className="text-xs w-32">Max: ${priceRange.max.toFixed(2)}</span>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex items-center gap-2">
								<input
									type="range"
									min={minPrice || 0}
									max={(maxPrice + minPrice) / 2 || 1500}
									value={priceRange.min}
									onChange={(e) => handlePriceChange(e, 'min')}
									className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
								/>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="range"
									min={(maxPrice + minPrice) / 2 || 1500}
									max={maxPrice || 0}
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
	)
}