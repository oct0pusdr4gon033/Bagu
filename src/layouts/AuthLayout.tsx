
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-100 to-neutral-200">

            {/* Contenedor central */}
            <div className="w-full max-w-md px-4">
                <Outlet />
            </div>

        </div>
    );
}


