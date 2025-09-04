import { useState } from 'react';
import { FaPlus, FaUsers } from 'react-icons/fa';
import { useDarkMode } from '../context/ThemeContext';
import { useAdmin } from '../context/AdminContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import AdminStats from '../components/dashboard/AdminStats';
import ProductForm from '../components/dashboard/ProductForm';
import ProductTable from '../components/dashboard/ProductTable';
import OrderList from '../components/dashboard/OrderList';
import UserProfile from '../components/dashboard/UserProfile';
import PaymentMethods from '../components/dashboard/PaymentMethods';

// Mock user data
const mockUser = {
	name: 'John Doe',
	email: 'john@example.com',
	joinDate: 'January 2024',
};

// Mock order history
const mockOrders = [
	{
		id: 'ORD001',
		date: '2024-02-15',
		total: 249.98,
		status: 'Delivered',
		items: [
			{ name: 'Product 1', quantity: 1, price: 99.99 },
			{ name: 'Product 2', quantity: 1, price: 149.99 },
		],
	},
	{
		id: 'ORD002',
		date: '2024-02-10',
		total: 99.99,
		status: 'Processing',
		items: [
			{ name: 'Product 3', quantity: 1, price: 99.99 },
		],
	},
];

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState('orders');
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	const { darkMode } = useDarkMode();
	const { isAdmin, products, stats, addProduct, updateProduct, deleteProduct, toggleAdmin } = useAdmin();

	const handleAddProduct = (productData) => {
		addProduct(productData);
		setShowAddProduct(false);
		setEditingProduct(null);
	};

	const handleEditProduct = (product) => {
		setEditingProduct(product);
		setShowAddProduct(true);
	};

	const handleUpdateProduct = (productData) => {
		updateProduct(editingProduct.id, productData);
		setEditingProduct(null);
		setShowAddProduct(false);
	};

	const handleDeleteProduct = (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			deleteProduct(productId);
		}
	};

	const handleToggleAdmin = () => {
		toggleAdmin();
	};

	const renderMainContent = () => {
		if (isAdmin) {
			switch (activeTab) {
				case 'stats':
					return <AdminStats stats={stats} />;
				case 'products':
					return (
						<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold">Products Management</h2>
								<button
									onClick={() => {
										setEditingProduct(null);
										setShowAddProduct(true);
									}}
									className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode
										? 'bg-green-600 hover:bg-green-700'
										: 'bg-green-500 hover:bg-green-600'
										} text-white`}
								>
									<FaPlus />
									<span>Add Product</span>
								</button>
							</div>
							<ProductForm
								showForm={showAddProduct}
								setShowForm={setShowAddProduct}
								editingProduct={editingProduct}
								setEditingProduct={setEditingProduct}
								onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
							/>
							<ProductTable
								products={products}
								onEdit={handleEditProduct}
								onDelete={handleDeleteProduct}
							/>
						</div>
					);
				case 'orders':
					return (
						<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
							<h2 className="text-xl font-semibold mb-4">Orders Management</h2>
							<OrderList orders={mockOrders} isAdmin={true} />
						</div>
					);
				case 'users':
					return (
						<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
							<h2 className="text-xl font-semibold mb-4">Users Management</h2>
							<div className="text-center py-8">
								<FaUsers className="text-6xl mx-auto mb-4 text-gray-400" />
								<p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
									User management features coming soon...
								</p>
							</div>
						</div>
					);
				default:
					return null;
			}
		} else {
			switch (activeTab) {
				case 'orders':
					return (
						<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
							<h2 className="text-xl font-semibold mb-4">Order History</h2>
							<OrderList orders={mockOrders} isAdmin={false} />
						</div>
					);
				case 'profile':
					return <UserProfile user={mockUser} />;
				case 'payment':
					return <PaymentMethods />;
				default:
					return null;
			}
		}
	};

	return (
		<div className={`min-h-screen pt-16 pl-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
			<div className="container mx-auto px-6 py-8">
				<DashboardHeader
					isAdmin={isAdmin}
					onToggleAdmin={handleToggleAdmin}
				/>

				{/* {isAdmin && activeTab === 'stats' && <AdminStats stats={stats} />} */}

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<DashboardSidebar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						isAdmin={isAdmin}
						user={mockUser}
					/>

					<div className="lg:col-span-3">
						{renderMainContent()}
					</div>
				</div>
			</div>
		</div>
	);
} 