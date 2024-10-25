import { NavLink } from "react-router-dom";

export default function Row({ to, children, setIsHidden }) {
    const style =
        "grid grid-cols-[2rem_1fr] items-center rounded-lg hover:bg-stone-300 px-8 py-1 transition-colors";
    return (
        <li>
            <NavLink
                onClick={() => setIsHidden(true)}
                to={to}
                className={({ isActive }) =>
                    style + `${isActive ? " bg-stone-300" : ""}`
                }
            >
                {children}
            </NavLink>
        </li>
    );
}
