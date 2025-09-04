import { FaStar, FaEye, FaShoppingCart } from "react-icons/fa";
import { useDarkMode } from "../../context/ThemeContext";

export default function TopProducts({ products = [] }) {
	const { darkMode } = useDarkMode();

	// Mock top products data with additional metrics
	const topProducts = [
		{
			id: 1,
			title: "Wireless Headphones",
			price: 199.99,
			rating: 4.8,
			views: 1250,
			sales: 89,
			image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center"
		},
		{
			id: 2,
			title: "Smart Watch",
			price: 299.99,
			rating: 4.6,
			views: 980,
			sales: 67,
			image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center"
		},
		{
			id: 3,
			title: "Laptop Stand",
			price: 49.99,
			rating: 4.9,
			views: 756,
			sales: 124,
			image: "https://images.unsplash.com/photo-1527864550417-7f91c4f76c42?w=100&h=100&fit=crop&crop=center"
		},
		{
			id: 4,
			title: "Bluetooth Speaker",
			price: 79.99,
			rating: 4.4,
			views: 634,
			sales: 45,
			image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop&crop=center"
		},
		{
			id: 5,
			title: "Phone Case",
			price: 24.99,
			rating: 4.7,
			views: 892,
			sales: 156,
			image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop&crop=center"
		}
	];

	return (
		<div className={`rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
			<h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
			<div className="space-y-4">
				{topProducts.map((product, index) => (
					<div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
						<div className="flex-shrink-0">
							<img
								src={product.image}
								alt={product.title}
								className="w-12 h-12 rounded-lg object-cover"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="text-sm font-medium truncate">{product.title}</h4>
							<p className="text-sm text-gray-500">${product.price}</p>
						</div>
						<div className="flex items-center space-x-4 text-sm text-gray-500">
							<div className="flex items-center space-x-1">
								<FaStar className="text-yellow-400" />
								<span>{product.rating}</span>
							</div>
							<div className="flex items-center space-x-1">
								<FaEye />
								<span>{product.views}</span>
							</div>
							<div className="flex items-center space-x-1">
								<FaShoppingCart />
								<span>{product.sales}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
