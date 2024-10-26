import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="order-8 self-center sm:order-[0]">
            <div className="select-none">Logo</div>
        </Link>
    );
}
