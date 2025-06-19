import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useShop } from "../context/ShopContext";

export default function CartCard({ darkMode }) {
	const { cart, removeFromCart, updateCartItemQuantity } = useShop();

	return (
		<div className="lg:col-span-2 space-y-4">
			{cart.map((item) => (
				<div
					key={`${item.id}-${item.color}`}
					className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
						} shadow-lg flex items-center gap-4`}
				>
					{/* Product Image */}
					<Link to={`/Retailer/item/${item.id}`} className="flex-shrink-0">
						<img
							src={item.image}
							alt={item.name}
							className="w-24 h-24 object-cover rounded-lg"
						/>
					</Link>

					{/* Product Info */}
					<div className="flex-grow">
						<Link
							to={`/Retailer/item/${item.id}`}
							className={`font-semibold hover:underline ${darkMode ? 'text-white' : 'text-gray-800'
								}`}
						>
							{item.name}
						</Link>
						{item.color && (
							<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
								Color: {item.color}
							</p>
						)}
						<p className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
							${item.price.toFixed(2)}
						</p>
					</div>

					{/* Quantity Controls */}
					<div className="flex items-center gap-4">
						<div className="flex items-center border rounded-lg overflow-hidden">
							<button
								onClick={() => updateCartItemQuantity(item.id, item.quantity - 1, item.color)}
								className={`px-3 py-1 ${darkMode
									? 'bg-gray-700 hover:bg-gray-600'
									: 'bg-gray-200 hover:bg-gray-300'
									}`}
							>
								-
							</button>
							<span className="px-4 py-1">{item.quantity}</span>
							<button
								onClick={() => updateCartItemQuantity(item.id, item.quantity + 1, item.color)}
								className={`px-3 py-1 ${darkMode
									? 'bg-gray-700 hover:bg-gray-600'
									: 'bg-gray-200 hover:bg-gray-300'
									}`}
							>
								+
							</button>
						</div>

						{/* Remove Button */}
						<button
							onClick={() => removeFromCart(item.id, item.color)}
							className={`p-2 rounded-lg ${darkMode
								? 'text-gray-400 hover:text-red-500'
								: 'text-gray-500 hover:text-red-600'
								} transition-colors duration-200`}
						>
							<FaTrash />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}