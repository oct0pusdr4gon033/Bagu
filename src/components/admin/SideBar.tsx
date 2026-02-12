import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";



interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:flex md:flex-col md:justify-between
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* Top */}
                <div className="flex flex-col gap-8 p-6 h-full overflow-y-auto">

                    {/* Logo & Close Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#742f37] text-white">
                                <span className="material-symbols-outlined text-[22px]">
                                    <img src="/logo.png" alt="Logo" className="w-[22px] h-[22px] object-contain" />
                                </span>
                            </div>
                            <div>
                                <h1 className="text-gray-900 text-lg font-bold leading-tight">
                                    Bagú
                                </h1>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                                    Adminnistrador
                                </p>
                            </div>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onClose}
                            className="md:hidden text-gray-500 hover:text-gray-900"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1">
                        {[
                            { icon: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
                            { icon: "colors", label: "Colores", path: "/admin/colores" },
                            { icon: "category", label: "Categorias", path: "/admin/categorias" },
                            { icon: "inventory_2", label: "Productos", path: "/admin/productos" },
                            { icon: "person", label: "Clientes", path: "/admin/clientes" },
                            { icon: "shopping_cart", label: "Pedidos", path: "/admin/pedidos" },
                            { icon: "shelves", label: "Materiales", path: "/admin/materiales" },
                        ].map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => onClose()} // Close sidebar on mobile navigation
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? "bg-[#742f37]/10 text-[#742f37] font-semibold border-l-4 border-[#742f37]"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom / User - Hidden on mobile if overflowing, or sticky */}
                <div className="p-6 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR0rA0gLU-4koL28i59NX5e_ZBzwwb4l4eq7Sit9EtyzpEtYWy64CyQhozvtYdASpN-m8ZVmGIsKo0HX2FsPMR4Tjp6-xMtwwL0qyQwRKtHIUqdrqUQWAg6b6SShHS5BrL9zvQ7lobm6AJYbcwxVO1xqxP-4wxOKChkipZwYv4cDahPl0zw8olSiKg1cWx6TLNIC02iohMFmrt7emLOcLZDY0u3uN_5RGt9P9DJOTba5Sg0n-S3huHmGplhdjl8XlDl8Q9-kFfPOM"
                            alt="Admin user"
                            className="w-10 h-10 rounded-full object-cover border border-[#742f37]"
                        />
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-gray-900 text-sm font-semibold truncate">
                                Juan Medrano
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                                Administrador
                            </p>
                        </div>
                    </div>
                </div>

            </aside>
        </>
    )
};
