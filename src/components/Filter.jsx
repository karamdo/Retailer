import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

export default function Filter({ darkMode, setFilteredProducts, Products }) {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = new Set(["All", ...Products.map((p) => p.category)]);

    const minPrice = 0;
    const maxPrice = Math.max(...Products.map((p) => p.price), 5000);

    useEffect(() => {
        // Filter products based on category and price range
        const filtered = Products.filter((product) => {
            const categoryMatch =
                selectedCategory === "All" ||
                product.category === selectedCategory;
            const priceMatch =
                product.price >= priceRange.min &&
                product.price <= priceRange.max;
            return categoryMatch && priceMatch;
        });
        setFilteredProducts(filtered);
    }, [selectedCategory, priceRange, Products, setFilteredProducts]);

    const handlePriceChange = (e, type) => {
        const value = parseFloat(e.target.value);
        setPriceRange((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    return (
        <div
            className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-72 overflow-y-auto p-4 ${darkMode ? "bg-gray-800" : "bg-white"} border-l shadow-lg ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
            <div className="sticky top-0 mb-2 flex items-center bg-inherit pb-2">
                <FaFilter className="mr-2 text-sm" />
                <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-3">
                <h3 className="mb-2 text-sm font-medium">Categories</h3>
                <div className="flex flex-col gap-1">
                    {Array.from(categories).map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded px-2 py-1 text-left text-sm ${
                                selectedCategory === category
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range Slider */}
            <div>
                <h3 className="mb-2 text-sm font-medium">Price Range</h3>
                <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <div className="flex w-full justify-between">
                                <span className="w-32 text-xs">
                                    Min: ${priceRange.min.toFixed(2)}
                                </span>
                                <span className="w-32 text-xs">
                                    Max: ${priceRange.max.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min={minPrice || 0}
                                    max={(maxPrice + minPrice) / 2 || 5000}
                                    value={priceRange.min}
                                    onChange={(e) =>
                                        handlePriceChange(e, "min")
                                    }
                                    className={`h-1.5 w-full cursor-pointer appearance-none rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min={(maxPrice + minPrice) / 2 || 5000}
                                    max={maxPrice || 0}
                                    value={priceRange.max}
                                    onChange={(e) =>
                                        handlePriceChange(e, "max")
                                    }
                                    className={`h-1.5 w-full cursor-pointer appearance-none rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
