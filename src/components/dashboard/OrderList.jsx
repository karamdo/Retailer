import { useDarkMode } from '../../context/ThemeContext';

export default function OrderList({ orders, isAdmin = false }) {
	const { darkMode } = useDarkMode();

	return (
		<div className="space-y-4">
			{orders.map((order) => (
				<div
					key={order.id}
					className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
				>
					<div className="flex justify-between items-center mb-2">
						<div>
							<span className="font-semibold">Order {order.id}</span>
							<span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
								{order.date}
							</span>
						</div>
						<span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered'
							? 'bg-green-100 text-green-800'
							: 'bg-yellow-100 text-yellow-800'
							}`}>
							{order.status}
						</span>
					</div>
					<div className="space-y-2">
						{order.items.map((item, index) => (
							<div key={index} className="flex justify-between text-sm">
								<span>
									{item.name} x {item.quantity}
								</span>
								<span>${item.price.toFixed(2)}</span>
							</div>
						))}
					</div>
					<div className="mt-2 pt-2 border-t border-gray-200 flex justify-between font-semibold">
						<span>Total</span>
						<span>${order.total.toFixed(2)}</span>
					</div>
				</div>
			))}
		</div>
	);
}