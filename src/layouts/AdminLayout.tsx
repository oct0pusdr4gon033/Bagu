import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Menu } from "lucide-react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate("/login");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f6f6]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#742f37]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f7f6f6]">

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#742f37] text-white">
                        <span className="material-symbols-outlined text-[18px]">
                            diamond
                        </span>
                    </div>
                    <span className="font-bold text-gray-900">Bagú Admin</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <SideBar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
}
