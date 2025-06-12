import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../showToast";

const ShopContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
}

export function ShopProvider({ children }) {
    // Initialize state from localStorage or with default values
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save to localStorage whenever cart or wishlist changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Cart functions
    const addToCart = (product, quantity = 1, color = null) => {
        setCart((prevCart) => {
            // Check if product already exists in cart
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === product.id && item.color === color,
            );

            if (existingItemIndex > -1) {
                // Update quantity if product exists
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // Add new item if product doesn't exist
                return [...prevCart, { ...product, quantity, color }];
            }
        });
        showToast.cart(`Added ${quantity} ${product.name} to cart!`);
    };

    const removeFromCart = (productId, color = null) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) => !(item.id === productId && item.color === color),
            ),
        );
        showToast.error("Item removed from cart");
    };

    const updateCartItemQuantity = (productId, quantity, color = null) => {
        if (quantity < 1) {
            removeFromCart(productId, color);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.color === color
                    ? { ...item, quantity }
                    : item,
            ),
        );
    };

    const clearCart = () => {
        setCart([]);
        showToast.error("Cart cleared");
    };

    // Wishlist functions
    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.some((item) => item.id === product.id)) {
                return prevWishlist; // Item already in wishlist
            }
            return [...prevWishlist, product];
        });
        showToast.wishlist(`Added ${product.name} to wishlist!`);
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.filter((item) => item.id !== productId),
        );
        showToast.error("Item removed from wishlist");
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    // Calculate cart totals
    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
    const cartItemsCount = cart.reduce(
        (count, item) => count + item.quantity,
        0,
    );

    const value = {
        cart,
        wishlist,
        cartTotal,
        cartItemsCount,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    };

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
}
