import { useDarkMode } from '../../context/ThemeContext';

export default function UserProfile({ user }) {
	const { darkMode } = useDarkMode();

	return (
		<div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
			<h2 className="text-xl font-semibold mb-4">Profile Information</h2>
			<form className="space-y-4">
				<div>
					<label className="block mb-1">Full Name</label>
					<input
						type="text"
						defaultValue={user.name}
						className={`w-full p-2 rounded-lg ${darkMode
							? 'bg-gray-700 text-white'
							: 'bg-gray-100 text-gray-800'
							}`}
					/>
				</div>
				<div>
					<label className="block mb-1">Email</label>
					<input
						type="email"
						defaultValue={user.email}
						className={`w-full p-2 rounded-lg ${darkMode
							? 'bg-gray-700 text-white'
							: 'bg-gray-100 text-gray-800'
							}`}
					/>
				</div>
				<button
					type="submit"
					className={`px-6 py-3 rounded-lg ${darkMode
						? 'bg-blue-600 hover:bg-blue-700'
						: 'bg-blue-500 hover:bg-blue-600'
						} text-white`}
				>
					Update Profile
				</button>
			</form>
		</div>
	);
}