import { NavLink } from "react-router-dom";

export default function Row({ to, children }) {
    const style =
        "grid grid-cols-[2rem_1fr] items-center rounded-lg px-8 py-1 transition-colors";
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    style + `${isActive ? " bg-base-100" : ""}`
                }
            >
                {children}
            </NavLink>
        </li>
    );
}
