import { HiOutlinePlusCircle } from "react-icons/hi";
import Row from "./Row";
import { HiOutlineHome } from "react-icons/hi2";
import { BiCart } from "react-icons/bi";

export default function Sidebar({ isHidden, setIsHidden }) {
    return (
        <ul
            className={`${isHidden ? "" : "translate-x-52"} fixed -left-52 top-[3.5rem] z-10 flex h-dvh flex-col gap-2 border-r border-stone-400 bg-stone-200 px-2 py-2 text-xl transition-transform sm:static sm:translate-x-0 sm:text-base lg:text-xl`}
        >
            <Row to="/cart" setIsHidden={setIsHidden} type="secondary">
                <BiCart />
                <span>Cart</span>
            </Row>
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
