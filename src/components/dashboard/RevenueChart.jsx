import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { useDarkMode } from "../../context/ThemeContext";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function RevenueChart() {
	const { darkMode } = useDarkMode();

	// Generate mock revenue data for the last 7 days
	const generateRevenueData = () => {
		const data = [];
		const labels = [];
		const today = new Date();

		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			labels.push(date.toLocaleDateString("en-US", { weekday: "short" }));
			// Generate random revenue between 1000 and 5000
			data.push(Math.floor(Math.random() * 4000) + 1000);
		}

		return { labels, data };
	};

	const { labels, data } = generateRevenueData();

	const chartData = {
		labels,
		datasets: [
			{
				label: "Daily Revenue ($)",
				data,
				backgroundColor: darkMode ? "#10B981" : "#059669",
				borderColor: darkMode ? "#10B981" : "#059669",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				labels: {
					color: darkMode ? "#E5E7EB" : "#374151",
				},
			},
			title: {
				display: true,
				text: "Daily Revenue (Last 7 Days)",
				color: darkMode ? "#E5E7EB" : "#374151",
				font: {
					size: 16,
					weight: "bold",
				},
			},
		},
		scales: {
			x: {
				grid: {
					color: darkMode ? "#374151" : "#E5E7EB",
				},
				ticks: {
					color: darkMode ? "#9CA3AF" : "#6B7280",
				},
			},
			y: {
				grid: {
					color: darkMode ? "#374151" : "#E5E7EB",
				},
				ticks: {
					color: darkMode ? "#9CA3AF" : "#6B7280",
					callback: function (value) {
						return "$" + value.toLocaleString();
					},
				},
			},
		},
	};

	return (
		<div className={`rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
			<div className="h-80">
				<Bar data={chartData} options={options} />
			</div>
		</div>
	);
}
