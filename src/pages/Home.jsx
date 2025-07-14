import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";

export default function Home() {
    const { darkMode } = useDarkMode();

    return (
        <div
            className={`min-h-screen pt-16 pl-64 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}
        >
            <div className="container mx-auto px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">
                        Welcome to Retailer
                    </h1>
                    <p className="mb-8 text-lg">
                        Your one-stop shop for all your needs. Discover amazing
                        products at great prices.
                    </p>
                    <Link
                        to="/Retailer/shop"
                        className={`inline-block rounded-lg px-6 py-3 ${
                            darkMode
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition-colors`}
                    >
                        Start Shopping
                    </Link>
                </div>

                {/* Features Section */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div
                        className={`rounded-lg p-6 ${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } shadow-lg`}
                    >
                        <h3 className="mb-2 text-xl font-semibold">
                            Easy Shopping
                        </h3>
                        <p
                            className={
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }
                        >
                            Browse through our extensive collection of products
                            with ease.
                        </p>
                    </div>
                    <div
                        className={`rounded-lg p-6 ${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } shadow-lg`}
                    >
                        <h3 className="mb-2 text-xl font-semibold">
                            Secure Checkout
                        </h3>
                        <p
                            className={
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }
                        >
                            Shop with confidence with our secure payment system.
                        </p>
                    </div>
                    <div
                        className={`rounded-lg p-6 ${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } shadow-lg`}
                    >
                        <h3 className="mb-2 text-xl font-semibold">
                            Fast Delivery
                        </h3>
                        <p
                            className={
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }
                        >
                            Get your products delivered quickly to your
                            doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
