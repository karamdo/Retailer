import { FaBox, FaUser, FaCreditCard, FaChartBar, FaUsers, FaShoppingCart } from 'react-icons/fa';
import { useDarkMode } from '../../context/ThemeContext';
import { useEffect } from 'react';

export default function DashboardSidebar({
	activeTab,
	setActiveTab,
	isAdmin,
	user
}) {
	const { darkMode } = useDarkMode();

	const adminTabs = [
		{ id: 'stats', label: 'Statistics', icon: FaChartBar },
		{ id: 'products', label: 'Products', icon: FaBox },
		{ id: 'orders', label: 'Orders', icon: FaShoppingCart },
		{ id: 'users', label: 'Users', icon: FaUsers },
	];

	const userTabs = [
		{ id: 'orders', label: 'Orders', icon: FaBox },
		{ id: 'profile', label: 'Profile', icon: FaUser },
		{ id: 'payment', label: 'Payment Methods', icon: FaCreditCard },
	];

	const tabs = isAdmin ? adminTabs : userTabs;

	return (
		<div className="lg:col-span-1">
			<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
				<div className="text-center mb-6">
					<div className="w-24 h-24 rounded-full bg-black mx-auto mb-4">
						<img
							src={user?.avatar}
							alt={user?.name || "User"}
							className="rounded-full object-cover"
						/>
					</div>
					<h2 className="text-xl font-semibold">{user.name}</h2>
					<p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
						{user.email}
					</p>
					<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
						{isAdmin ? 'Administrator' : `Member since ${user.joinDate}`}
					</p>
				</div>

				<nav>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === tab.id
								? darkMode
									? 'bg-gray-700 text-white'
									: 'bg-blue-500 text-white'
								: darkMode
									? 'hover:bg-gray-700'
									: 'hover:bg-gray-100'
								}`}
						>
							<tab.icon />
							<span>{tab.label}</span>
						</button>
					))}
				</nav>
			</div>
		</div>
	);
}
