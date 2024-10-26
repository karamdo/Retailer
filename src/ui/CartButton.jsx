import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartButton() {
    return (
        <Link to="/cart" className="hidden self-center sm:inline">
            <BiCart />
        </Link>
    );
}
