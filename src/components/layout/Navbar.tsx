export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#1d1516]/90 backdrop-blur border-b border-[#342d2d]">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent-gold text-3xl">
                        Bagu
                    </span>
                    <h1 className="font-serif text-xl font-bold tracking-wide">
                        DISTINCIÓN A LA MANO
                    </h1>
                </div>

                <nav className="hidden lg:flex gap-8 text-sm">
                    {['Compra', 'Colecciones', 'Nuestra historia', 'Lanzamientos'].map(item => (
                        <a
                            key={item}
                            href="#"
                            className="hover:text-accent-gold transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </header>

    );
}
