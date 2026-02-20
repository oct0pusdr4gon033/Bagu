import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-primary-wine">
                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>

                            <img src="logo.png" alt="loguitoBagu" className="w-12 h-12" />

                        </span>
                        <h1 className="text-xl font-serif font-semibold tracking-[0.2em] uppercase">AGÚ</h1>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-10 ml-12">
                        <Link to="/" className="text-[13px] font-medium uppercase tracking-widest hover:text-accent-gold transition-colors">Inicio</Link>
                        <Link to="/collections" className="text-[13px] font-medium uppercase tracking-widest hover:text-accent-gold transition-colors">Colecciones</Link>
                        <Link to="/about" className="text-[13px] font-medium uppercase tracking-widest hover:text-accent-gold transition-colors">Nuestra Historia</Link>
                    </nav>
                </div>

            </div>
        </header>
    );
}