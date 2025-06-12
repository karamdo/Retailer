import { Link } from "react-router-dom";
import { useState } from "react";
import { FaMoon, FaSun, FaShoppingCart, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import { useDarkMode } from "../context/ThemeContext";

export default function Navbar() {
	const [searchQuery, setSearchQuery] = useState("");
	const { darkMode, toggleDarkMode } = useDarkMode();

	return (
		<nav
			className={`fixed top-0 z-50 w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} shadow-md`}
		>
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Logo and Brand */}
					<Link to="/" className="flex items-center space-x-2">
						<Logo
							size="small"
							className={
								darkMode ? "text-white" : "text-gray-800"
							}
						/>
						<span className="text-2xl font-bold">RETAILER</span>
					</Link>

					{/* Search Bar */}
					<div className="mx-4 max-w-xl flex-1">
						<div className="relative">
							<input
								type="text"
								placeholder="Search products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className={`w-full rounded-lg px-4 py-2 ${darkMode
									? "bg-gray-800 text-white placeholder-gray-400"
									: "bg-gray-100 text-gray-800 placeholder-gray-500"
									} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
							/>
						</div>
					</div>

					{/* Right Side Icons */}
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleDarkMode}
							className={`hover:bg-opacity-80 rounded-full p-2 ${darkMode
								? "hover:bg-gray-700"
								: "hover:bg-gray-100"
								}`}
						>
							{darkMode ? (
								<FaSun className="text-gray-100" />
							) : (
								<FaMoon className="text-gray-700" />
							)}
						</button>

						<Link
							to="/cart"
							className={`hover:bg-opacity-80 rounded-full p-2 ${darkMode
								? "hover:bg-gray-700"
								: "hover:bg-gray-100"
								}`}
						>
							<FaShoppingCart className="text-xl" />
						</Link>

						<Link
							to="/signin"
							className={`hover:bg-opacity-80 rounded-full p-2 ${darkMode
								? "hover:bg-gray-700"
								: "hover:bg-gray-100"
								}`}
						>
							<FaUser className="text-xl" />
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
