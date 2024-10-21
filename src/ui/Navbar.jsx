import Button from "./Button";
import Logo from "./Logo";

export default function Navbar({ hidden, isHidden }) {
    return (
        <div className="z-10 col-span-2 flex h-20 justify-between border-b border-stone-400 px-4 py-4 text-4xl backdrop-blur-md sm:px-8">
            <Button isHidden={isHidden} hidden={hidden} />
            <Logo />
        </div>
    );
}
