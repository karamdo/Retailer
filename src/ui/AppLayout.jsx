import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AppLayout() {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <div className="flex h-dvh flex-col sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_1fr]">
            <Navbar onClick={() => setIsHidden(!isHidden)} />
            <Sidebar isHidden={isHidden} />
            <div className={`${isHidden ? "" : "blur-lg"} p-5 sm:blur-none`}>
                <Outlet />
            </div>
        </div>
    );
}
