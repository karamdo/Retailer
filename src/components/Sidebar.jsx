import { Link, useLocation } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaUser, FaEnvelope } from 'react-icons/fa';

export default function Sidebar({ darkMode }) {
	const location = useLocation();

	const navItems = [
		{ path: '/shop', icon: <FaShoppingBag />, label: 'Shop' },
		{ path: '/wishlist', icon: <FaHeart />, label: 'Wishlist' },
		{ path: '/dashboard', icon: <FaUser />, label: 'Dashboard' },
		{ path: '/contact', icon: <FaEnvelope />, label: 'Contact' },
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
								className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
									? darkMode
										? 'bg-gray-700 text-white'
										: 'bg-blue-500 text-white'
									: darkMode
										? 'hover:bg-gray-700'
										: 'hover:bg-gray-100'
									}`}
							>
								<span className="text-xl">{item.icon}</span>
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
} 