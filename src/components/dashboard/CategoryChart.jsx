import { Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { useDarkMode } from "../../context/ThemeContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
	const { darkMode } = useDarkMode();

	// Mock category data
	const categoryData = {
		labels: ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty"],
		datasets: [
			{
				data: [35, 25, 15, 12, 8, 5],
				backgroundColor: [
					"#3B82F6",
					"#10B981",
					"#F59E0B",
					"#EF4444",
					"#8B5CF6",
					"#EC4899"
				],
				borderColor: darkMode ? "#374151" : "#FFFFFF",
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					color: darkMode ? "#E5E7EB" : "#374151",
					padding: 20,
				},
			},
			title: {
				display: true,
				text: "Product Categories Distribution",
				color: darkMode ? "#E5E7EB" : "#374151",
				font: {
					size: 16,
					weight: "bold",
				},
			},
		},
	};

	return (
		<div className={`rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
			<div className="h-80">
				<Doughnut data={categoryData} options={options} />
			</div>
		</div>
	);
}
