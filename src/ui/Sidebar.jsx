import { HiOutlinePlusCircle } from "react-icons/hi";
import Row from "./Row";
import { HiOutlineHome } from "react-icons/hi2";

export default function Sidebar({ isHidden }) {
    return (
        <ul
            className={`${isHidden ? "" : "translate-x-52"} fixed -left-52 top-14 z-10 flex h-dvh flex-col border-r border-stone-800 bg-stone-900 px-2 py-4 text-stone-100 transition-transform sm:static sm:translate-x-0`}
        >
            <Row to="/main">
                <HiOutlineHome />
                <span>Main</span>
            </Row>
            <Row to="/admin">
                <HiOutlinePlusCircle />
                <span>Admin</span>
            </Row>
        </ul>
    );
}
