import { toast } from "react-toastify";

// Toast configuration
export const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

// Export toast functions for use in other components
export const showToast = {
    cart: (message, navigate) => {
        toast.success(message, {
            ...toastConfig,
            icon: "🛒",
            onClick: () => navigate && navigate("/cart"),
        });
    },
    wishlist: (message, navigate) => {
        toast.success(message, {
            ...toastConfig,
            icon: "❤️",
            onClick: () => navigate && navigate("/wishlist"),
        });
    },
    error: (message) => {
        toast.error(message, toastConfig);
    },
};
