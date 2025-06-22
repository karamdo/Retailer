import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useDarkMode } from '../context/ThemeContext';
import Filter from '../components/Filter';
import Spinner from '../components/Spinner';
import { useQuery } from '@tanstack/react-query';

export default function Shop() {
	const { darkMode } = useDarkMode();

	const { data, isLoading, error } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const response = await fetch('https://dummyjson.com/products');
			if (!response.ok) throw new Error('Network response was not ok');
			return response.json();
		},
	});

	const products = data?.products || [];
	const [filteredProducts, setFilteredProducts] = useState(products);

	useEffect(() => {
		setFilteredProducts(products);
	}, [products]);

	if (isLoading) {
		return (
			<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
				<div className="container mx-auto px-6 py-8 relative">
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center">
							<Spinner size="xl" className="mb-4" />
							<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
								Loading products...
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return <div className="text-red-500">Error loading products: {error.message}</div>;
	}

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
				<Filter darkMode={darkMode} setFilteredProducts={setFilteredProducts} Products={products} />
			</div>
		</div>
	);
}