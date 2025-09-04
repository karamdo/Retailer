import { FaBox, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';
import { useDarkMode } from '../../context/ThemeContext';
import VisitorChart from './VisitorChart';
import RevenueChart from './RevenueChart';
import CategoryChart from './CategoryChart';
import TopProducts from './TopProducts';
import RecentActivity from './RecentActivity';

export default function AdminStats({ stats }) {
	const { darkMode } = useDarkMode();

	const statCards = [
		{
			title: 'Total Products',
			value: stats.totalProducts,
			icon: FaBox,
			color: darkMode ? 'bg-blue-600' : 'bg-blue-500',
		},
		{
			title: 'Total Orders',
			value: stats.totalOrders,
			icon: FaShoppingCart,
			color: darkMode ? 'bg-green-600' : 'bg-green-500',
		},
		{
			title: 'Total Revenue',
			value: `$${stats.totalRevenue.toLocaleString()}`,
			icon: FaDollarSign,
			color: darkMode ? 'bg-yellow-600' : 'bg-yellow-500',
		},
		{
			title: 'Total Users',
			value: stats.totalUsers,
			icon: FaUsers,
			color: darkMode ? 'bg-purple-600' : 'bg-purple-500',
		},
	];

	return (
		<div className="space-y-8">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statCards.map((stat, index) => (
					<div key={index} className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
						<div className="flex items-center">
							<div className={`p-3 rounded-full ${stat.color}`}>
								<stat.icon className="text-white text-xl" />
							</div>
							<div className="ml-4">
								<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
									{stat.title}
								</p>
								<p className="text-2xl font-bold">{stat.value}</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<VisitorChart />
				<RevenueChart />
			</div>

			{/* Category Chart and Top Products Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<CategoryChart />
				<TopProducts />
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1">
				<RecentActivity />
			</div>
		</div>
	);
}
