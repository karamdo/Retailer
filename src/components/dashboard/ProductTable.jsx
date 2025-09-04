import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDarkMode } from '../../context/ThemeContext';

export default function ProductTable({ products, onEdit, onDelete }) {
	const { darkMode } = useDarkMode();

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
						<th className="text-left py-3 px-4">Product</th>
						<th className="text-left py-3 px-4">Price</th>
						<th className="text-left py-3 px-4">Stock</th>
						<th className="text-left py-3 px-4">Category</th>
						<th className="text-left py-3 px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.slice(0, 10).map((product) => (
						<tr key={product.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
							<td className="py-3 px-4">
								<div className="flex items-center space-x-3">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="w-12 h-12 rounded-lg object-cover"
									/>
									<div>
										<p className="font-semibold">{product.title}</p>
										<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
											{product.brand}
										</p>
									</div>
								</div>
							</td>
							<td className="py-3 px-4">${product.price}</td>
							<td className="py-3 px-4">{product.stock || 0}</td>
							<td className="py-3 px-4">{product.category}</td>
							<td className="py-3 px-4">
								<div className="flex space-x-2">
									<button
										onClick={() => onEdit(product)}
										className={`p-2 rounded-lg ${darkMode
											? 'bg-blue-600 hover:bg-blue-700'
											: 'bg-blue-500 hover:bg-blue-600'
											} text-white`}
									>
										<FaEdit />
									</button>
									<button
										onClick={() => onDelete(product.id)}
										className={`p-2 rounded-lg ${darkMode
											? 'bg-red-600 hover:bg-red-700'
											: 'bg-red-500 hover:bg-red-600'
											} text-white`}
									>
										<FaTrash />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
} 