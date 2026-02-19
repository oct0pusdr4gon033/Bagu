import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#1d1516]/90 backdrop-blur border-b border-[#342d2d]">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent-gold text-3xl">
                        <img src="/logo.png" alt="Logo" className="w-20 h-20" />

                    </span>
                    <h1 className="text-2xl font-bold text-accent-gold">AGÚ</h1>

                </div>
                <nav className="hidden lg:flex gap-8 text-sm">
                    <a href="/" className="hover:text-accent-gold transition-colors">Inicio</a>
                    <Link to="/collections" className="hover:text-accent-gold transition-colors">Colecciones</Link>
                    <a href="#" className="hover:text-accent-gold transition-colors">Nuestra historia</a>
                </nav>
            </div>
        </header>

    );
}
