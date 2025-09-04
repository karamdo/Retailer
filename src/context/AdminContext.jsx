import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../showToast";

const AdminContext = createContext();

export function useAdmin() {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return context;
}

export function AdminProvider({ children }) {
	const [isAdmin, setIsAdmin] = useState(() => {
		const savedAdmin = localStorage.getItem("isAdmin");
		return savedAdmin ? JSON.parse(savedAdmin) : false;
	});

	const [products, setProducts] = useState([]);
	const [stats, setStats] = useState({
		totalProducts: 0,
		totalOrders: 0,
		totalRevenue: 0,
		totalUsers: 0,
		dailyVisitors: [],
	});

	// Save admin status to localStorage
	useEffect(() => {
		localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
	}, [isAdmin]);

	// Load products from API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("https://dummyjson.com/products");
				if (response.ok) {
					const data = await response.json();
					setProducts(data.products || []);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	// Generate mock visitor data for the last 30 days
	const generateVisitorData = () => {
		const visitors = [];
		const today = new Date();

		for (let i = 29; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			visitors.push({
				date: date.toISOString().split("T")[0],
				count: Math.floor(Math.random() * 450) + 50,
			});
		}

		return visitors;
	};

	// Mock stats - in real app, these would come from API
	useEffect(() => {
		setStats({
			totalProducts: products.length,
			totalOrders: 1247,
			totalRevenue: 478.9,
			totalUsers: 3421,
			dailyVisitors: generateVisitorData(),
		});
	}, [products.length]);

	const addProduct = (newProduct) => {
		const product = {
			id: Date.now().toString(),
			...newProduct,
			rating: 0,
			stock: newProduct.stock || 0,
		};
		setProducts(prev => [...prev, product]);
		showToast.success("Product added successfully!");
	};

	const updateProduct = (productId, updatedProduct) => {
		setProducts(prev =>
			prev.map(product =>
				product.id === productId
					? { ...product, ...updatedProduct }
					: product
			)
		);
		showToast.success("Product updated successfully!");
	};

	const deleteProduct = (productId) => {
		setProducts(prev => prev.filter(product => product.id !== productId));
		showToast.error("Product deleted successfully!");
	};

	const toggleAdmin = () => {
		setIsAdmin(prev => !prev);
		showToast.success(isAdmin ? "Switched to user mode" : "Switched to admin mode");
	};

	const value = {
		isAdmin,
		products,
		stats,
		addProduct,
		updateProduct,
		deleteProduct,
		toggleAdmin,
	};

	return (
		<AdminContext.Provider value={value}>
			{children}
		</AdminContext.Provider>
	);
}
