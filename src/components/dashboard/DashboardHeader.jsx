import { FaSignOutAlt } from 'react-icons/fa';
import { useDarkMode } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader({ isAdmin, onToggleAdmin }) {
	const { darkMode } = useDarkMode();
	const { signOut } = useAuth();
	const navigate = useNavigate();

	const handleSignOut = () => {
		signOut();
		navigate('/Retailer/signin');
	};

	return (
		<div className="flex justify-between items-center mb-8">
			<h1 className="text-2xl font-bold">
				{isAdmin ? 'Admin Dashboard' : 'Dashboard'}
			</h1>
			<div className="flex space-x-4">
				<button
					onClick={onToggleAdmin}
					className={`px-4 py-2 rounded-lg ${darkMode
						? 'bg-blue-600 hover:bg-blue-700'
						: 'bg-blue-500 hover:bg-blue-600'
						} text-white`}
				>
					{isAdmin ? 'Switch to User' : 'Switch to Admin'}
				</button>
				<button
					onClick={handleSignOut}
					className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode
						? 'bg-red-600 hover:bg-red-700'
						: 'bg-red-500 hover:bg-red-600'
						} text-white`}
				>
					<FaSignOutAlt />
					<span>Sign Out</span>
				</button>
			</div>
		</div>
	);
}
