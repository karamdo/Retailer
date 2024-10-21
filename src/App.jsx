import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Main from "./pages/Main";
import Admin from "./pages/Admin";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="main" />} />
                    <Route path="main" element={<Main />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
