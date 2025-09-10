import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}

export function AuthProvider({ children }) {
	const [token, setToken] = useState(() => localStorage.getItem("authToken") || "");
	const [user, setUser] = useState(() => {
		const raw = localStorage.getItem("authUser");
		return raw ? JSON.parse(raw) : null;
	});
	const [role, setRole] = useState(() => localStorage.getItem("authRole") || "guest");

	useEffect(() => {
		if (token) localStorage.setItem("authToken", token);
		else localStorage.removeItem("authToken");
	}, [token]);

	useEffect(() => {
		if (user) localStorage.setItem("authUser", JSON.stringify(user));
		else localStorage.removeItem("authUser");
	}, [user]);

	useEffect(() => {
		if (role) localStorage.setItem("authRole", role);
		else localStorage.removeItem("authRole");
	}, [role]);

	const signOut = () => {
		setToken("");
		setUser(null);
		setRole("guest");
	};

	const value = useMemo(
		() => ({ token, user, role, setToken, setUser, setRole, signOut }),
		[token, user, role]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


