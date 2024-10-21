import { NavLink } from "react-router-dom";

export default function Row({ to, children }) {
    return (
        <li>
            <NavLink
                to={to}
                className="grid grid-cols-[2rem_1fr] items-center rounded-lg px-8 py-1 transition-colors hover:bg-stone-800"
            >
                {children}
            </NavLink>
        </li>
    );
}
