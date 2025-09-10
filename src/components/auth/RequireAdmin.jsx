import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireAdmin({ children }) {
	const { token, role } = useAuth();
	const location = useLocation();
	if (!token) {
		return <Navigate to="/Retailer/signin" state={{ from: location }} replace />;
	}
	if (role !== 'admin') {
		return <Navigate to="/Retailer" replace />;
	}
	return children;
}


