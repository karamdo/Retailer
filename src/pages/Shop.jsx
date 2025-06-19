import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useDarkMode } from '../context/ThemeContext';
import Filter from '../components/Filter';
import { mockProducts } from '../data/data';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

export default function Shop() {
	const { darkMode } = useDarkMode();
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8 relative">
				{/* Products Grid */}
				<div className="pr-80"> {/* Add padding to prevent overlap with fixed filters */}
					{filteredProducts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map(product => (
								<Link to={`/Retailer/item/${product.id}`} key={product.id} className="block">
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
				<Filter categories={categories} darkMode={darkMode} setFilteredProducts={setFilteredProducts} />
			</div>
		</div>
	);
}