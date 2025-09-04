import { useState, useEffect } from 'react';
import { useDarkMode } from '../../context/ThemeContext';

export default function ProductForm({
	showForm,
	setShowForm,
	editingProduct,
	setEditingProduct,
	onSubmit
}) {
	const { darkMode } = useDarkMode();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		price: '',
		discountPercentage: '',
		rating: '',
		stock: '',
		brand: '',
		category: '',
		thumbnail: '',
	});

	useEffect(() => {
		if (editingProduct) {
			setFormData({
				title: editingProduct.title || '',
				description: editingProduct.description || '',
				price: editingProduct.price?.toString() || '',
				discountPercentage: editingProduct.discountPercentage?.toString() || '',
				rating: editingProduct.rating?.toString() || '',
				stock: editingProduct.stock?.toString() || '',
				brand: editingProduct.brand || '',
				category: editingProduct.category || '',
				thumbnail: editingProduct.thumbnail || '',
			});
		} else {
			setFormData({
				title: '',
				description: '',
				price: '',
				discountPercentage: '',
				rating: '',
				stock: '',
				brand: '',
				category: '',
				thumbnail: '',
			});
		}
	}, [editingProduct]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const productData = {
			...formData,
			price: parseFloat(formData.price),
			discountPercentage: parseFloat(formData.discountPercentage) || 0,
			rating: parseFloat(formData.rating) || 0,
			stock: parseInt(formData.stock) || 0,
		};
		onSubmit(productData);
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingProduct(null);
		setFormData({
			title: '',
			description: '',
			price: '',
			discountPercentage: '',
			rating: '',
			stock: '',
			brand: '',
			category: '',
			thumbnail: '',
		});
	};

	if (!showForm) return null;

	return (
		<div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
			<h3 className="text-lg font-semibold mb-4">
				{editingProduct ? 'Edit Product' : 'Add New Product'}
			</h3>
			<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input
					type="text"
					placeholder="Product Title"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
					required
				/>
				<input
					type="text"
					placeholder="Brand"
					value={formData.brand}
					onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
				/>
				<input
					type="number"
					placeholder="Price"
					value={formData.price}
					onChange={(e) => setFormData({ ...formData, price: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
					required
				/>
				<input
					type="number"
					placeholder="Stock"
					value={formData.stock}
					onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
				/>
				<input
					type="text"
					placeholder="Category"
					value={formData.category}
					onChange={(e) => setFormData({ ...formData, category: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
				/>
				<input
					type="url"
					placeholder="Thumbnail URL"
					value={formData.thumbnail}
					onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
					className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
				/>
				<textarea
					placeholder="Description"
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					className={`p-2 rounded-lg md:col-span-2 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
					rows="3"
				/>
				<div className="md:col-span-2 flex space-x-4">
					<button
						type="submit"
						className={`px-6 py-2 rounded-lg ${darkMode
							? 'bg-blue-600 hover:bg-blue-700'
							: 'bg-blue-500 hover:bg-blue-600'
							} text-white`}
					>
						{editingProduct ? 'Update Product' : 'Add Product'}
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className={`px-6 py-2 rounded-lg ${darkMode
							? 'bg-gray-600 hover:bg-gray-700'
							: 'bg-gray-500 hover:bg-gray-600'
							} text-white`}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
} 