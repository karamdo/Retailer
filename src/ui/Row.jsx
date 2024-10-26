import { NavLink } from "react-router-dom";

export default function Row({ to, children, setIsHidden, type }) {
    let style =
        "grid mx-auto px-3 grid-cols-[2rem_1fr] items-center rounded-lg hover:bg-stone-300 py-1 transition-colors";
    return (
        <li className="">
            <NavLink
                onClick={() => setIsHidden(true)}
                to={to}
                className={({ isActive }) =>
                    style +
                    `${isActive ? " bg-stone-300" : ""} ${type === "secondary" ? "sm:hidden" : ""} `
                }
            >
                {children}
            </NavLink>
        </li>
    );
}
