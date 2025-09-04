import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { useDarkMode } from "../../context/ThemeContext";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function VisitorChart() {
	const { darkMode } = useDarkMode();

	// Generate mock data for the last 30 days
	const generateVisitorData = () => {
		const data = [];
		const labels = [];
		const today = new Date();

		for (let i = 29; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
			// Generate random visitor count between 50 and 500
			data.push(Math.floor(Math.random() * 450) + 50);
		}

		return { labels, data };
	};

	const { labels, data } = generateVisitorData();

	const chartData = {
		labels,
		datasets: [
			{
				label: "Daily Visitors",
				data,
				borderColor: darkMode ? "#3B82F6" : "#2563EB",
				backgroundColor: darkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(37, 99, 235, 0.1)",
				tension: 0.4,
				fill: true,
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
				text: "Daily Visitors (Last 30 Days)",
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
				},
			},
		},
	};

	return (
		<div className={`rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
			<div className="h-80">
				<Line data={chartData} options={options} />
			</div>
		</div>
	);
}
