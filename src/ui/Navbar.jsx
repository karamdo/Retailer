import Logo from "./Logo";

export default function Navbar({ onClick }) {
    return (
        <div className="col-span-2 flex justify-between border-b border-stone-400 px-8 py-4 backdrop-blur-md">
            <button className="sm:hidden" onClick={onClick}>
                side
            </button>
            <Logo />
            <p>bla bla bla</p>
        </div>
    );
}
