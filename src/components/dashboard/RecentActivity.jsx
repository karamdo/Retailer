import { FaUser, FaShoppingCart, FaBox, FaDollarSign } from "react-icons/fa";
import { useDarkMode } from "../../context/ThemeContext";

export default function RecentActivity() {
	const { darkMode } = useDarkMode();

	// Mock recent activity data
	const activities = [
		{
			id: 1,
			type: "order",
			message: "New order #1234 received",
			time: "2 minutes ago",
			icon: FaShoppingCart,
			color: "text-green-500"
		},
		{
			id: 2,
			type: "user",
			message: "New user registered",
			time: "15 minutes ago",
			icon: FaUser,
			color: "text-blue-500"
		},
		{
			id: 3,
			type: "product",
			message: "Product 'Wireless Headphones' updated",
			time: "1 hour ago",
			icon: FaBox,
			color: "text-yellow-500"
		},
		{
			id: 4,
			type: "revenue",
			message: "Payment of $299.99 processed",
			time: "2 hours ago",
			icon: FaDollarSign,
			color: "text-green-500"
		},
		{
			id: 5,
			type: "order",
			message: "Order #1233 shipped",
			time: "3 hours ago",
			icon: FaShoppingCart,
			color: "text-purple-500"
		},
		{
			id: 6,
			type: "product",
			message: "New product 'Smart Watch' added",
			time: "4 hours ago",
			icon: FaBox,
			color: "text-yellow-500"
		}
	];

	return (
		<div className={`rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
			<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
			<div className="space-y-4">
				{activities.map((activity) => (
					<div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
						<div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
							<activity.icon className={`w-4 h-4 ${activity.color}`} />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
								{activity.message}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{activity.time}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
