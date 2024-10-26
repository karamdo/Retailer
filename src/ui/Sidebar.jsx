import { HiOutlinePlusCircle } from "react-icons/hi";
import Row from "./Row";
import { HiOutlineHome } from "react-icons/hi2";

export default function Sidebar({ isHidden, setIsHidden }) {
    return (
        <ul
            className={`${isHidden ? "" : "translate-x-52"} fixed -left-52 top-20 z-10 flex h-dvh flex-col gap-2 border-r border-stone-400 bg-stone-200 px-2 py-4 text-xl transition-transform sm:static sm:translate-x-0 sm:text-base lg:text-xl`}
        >
            <Row to="/main" setIsHidden={setIsHidden}>
                <HiOutlineHome />
                <span>Main</span>
            </Row>
            <Row to="/admin" setIsHidden={setIsHidden}>
                <HiOutlinePlusCircle />
                <span>Admin</span>
            </Row>
        </ul>
    );
}
