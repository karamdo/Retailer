import Button from "./Button";
import CartButton from "./CartButton";
import Logo from "./Logo";
import SearchFiled from "./SearchFiled";

export default function Navbar({ isHidden, setIsHidden }) {
    return (
        <div className="bg-base-300 z-10 col-span-2 flex justify-between border-b border-stone-400 px-4 py-2 text-2xl backdrop-blur-md sm:px-8">
            <Button isHidden={isHidden} setIsHidden={setIsHidden} />
            <Logo />
            <SearchFiled />
            <CartButton />
        </div>
    );
}
