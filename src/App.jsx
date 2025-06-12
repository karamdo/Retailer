import { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "./components/LoadingScreen";
import { useDarkMode } from "./hooks/useDarkMode";
import { ShopProvider } from "./context/ShopContext";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Contact = lazy(() => import("./pages/Contact"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ItemDetail = lazy(() => import("./pages/ItemDetail"));

// Loading component for route transitions
const RouteLoadingScreen = () => (
    <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

export default function App() {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <ShopProvider>
            <div className={darkMode ? "dark" : ""}>
                <ToastContainer
                    theme={darkMode ? "dark" : "light"}
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {isInitialLoad ? (
                    <LoadingScreen
                        onLoadComplete={() => setIsInitialLoad(false)}
                    />
                ) : (
                    <>
                        <Navbar
                            darkMode={darkMode}
                            toggleDarkMode={toggleDarkMode}
                        />
                        <Sidebar />
                        <Suspense fallback={<RouteLoadingScreen />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route
                                    path="/checkout"
                                    element={<Checkout />}
                                />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/contact" element={<Contact />} />
                                <Route
                                    path="/wishlist"
                                    element={<Wishlist />}
                                />
                                <Route
                                    path="/item/:id"
                                    element={<ItemDetail />}
                                />
                            </Routes>
                        </Suspense>
                    </>
                )}
            </div>
        </ShopProvider>
    );
}
