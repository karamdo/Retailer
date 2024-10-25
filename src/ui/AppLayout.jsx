import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AppLayout() {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <div className="flex h-dvh w-dvw flex-col overflow-x-hidden sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr]">
            <Navbar
                isHidden={isHidden}
                setIsHidden={() => setIsHidden(!isHidden)}
            />
            <Sidebar isHidden={isHidden} setIsHidden={setIsHidden} />
            <div
                className={`${isHidden ? "" : "blur-lg"} py-5 text-lg sm:blur-none`}
            >
                <Outlet />
            </div>
        </div>
    );
}
