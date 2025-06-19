import { Link, useLocation } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUser, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { useDarkMode } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';

export default function Sidebar() {
	const location = useLocation();
	const { darkMode } = useDarkMode();
	const { cartItemsCount, wishlist } = useShop();

	const navItems = [
		{ path: '/Retailer/shop', icon: <FaShoppingBag />, label: 'Shop' },
		{ path: '/Retailer/cart', icon: <FaShoppingCart />, label: 'Cart', count: cartItemsCount },
		{ path: '/Retailer/wishlist', icon: <FaHeart />, label: 'Wishlist', count: wishlist.length },
		{ path: '/Retailer/dashboard', icon: <FaUser />, label: 'Dashboard' },
		{ path: '/Retailer/contact', icon: <FaEnvelope />, label: 'Contact' },
	];

	return (
		<aside className={`fixed left-0 top-16 h-screen w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
			} shadow-lg`}>
			<nav className="p-4">
				<ul className="space-y-2">
					{navItems.map((item) => (
						<li key={item.path}>
							<Link
								to={item.path}
								className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
									? darkMode
										? 'bg-gray-700 text-white'
										: 'bg-blue-500 text-white'
									: darkMode
										? 'hover:bg-gray-700'
										: 'hover:bg-gray-100'
									}`}
							>
								<div className="flex items-center space-x-3">
									<span className="text-xl">{item.icon}</span>
									<span>{item.label}</span>
								</div>
								{item.count > 0 && (
									<span className={`px-2 py-1 text-xs font-bold rounded-full ${darkMode
										? 'bg-red-500 text-white'
										: 'bg-red-500 text-white'
										}`}>
										{item.count}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
} 