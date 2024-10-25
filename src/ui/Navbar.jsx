import Button from "./Button";
import Logo from "./Logo";

export default function Navbar({ isHidden, setIsHidden }) {
    return (
        <div className="z-10 col-span-2 flex h-20 justify-between border-b border-stone-400 bg-base-300 px-4 py-4 text-4xl backdrop-blur-md sm:px-8">
            <Button isHidden={isHidden} setIsHidden={setIsHidden} />
            <Logo />
        </div>
    );
}
