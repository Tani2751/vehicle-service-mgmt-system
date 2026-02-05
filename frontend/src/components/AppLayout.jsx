import { Outlet } from "react-router";
import { AuthProvider } from "../context/AuthProvider";


export function AppLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}