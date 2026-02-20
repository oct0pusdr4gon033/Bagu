import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-pure-white border-t border-gray-100 pt-20 pb-12">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-primary-wine">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                                <img src="logo.png" alt="loguitoBagu" className="w-12 h-12" />
                            </span>
                            <h4 className="text-lg font-serif font-semibold tracking-widest uppercase">AGÚ</h4>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
                            Curating a collection of refined leather goods that embody minimalist elegance and unparalleled craftsmanship.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-wine">Colecciones</h5>
                        <nav className="flex flex-col gap-3">
                            <Link to="/collections/2" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Carteras</Link>
                            <Link to="/collections/3" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Bolsos</Link>
                            <Link to="/collections/1" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Morrales</Link>
                            <Link to="/collections/7" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Billeteras</Link>
                            <Link to="/collections/6" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Maletines</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-wine">Empresa</h5>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Quienes Somos</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Sostenibilidad</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Cuidado del Cuero</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-accent-gold transition-colors">Contacto</a>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-wine">Social</h5>
                        <div className="flex flex-col gap-3 text-sm text-gray-500">
                            <a href="https://www.instagram.com/agucuero/" className="hover:text-accent-gold transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.facebook.com/agucuero" className="hover:text-accent-gold transition-colors" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://www.tiktok.com/@agucuero" className="hover:text-accent-gold transition-colors" target="_blank" rel="noopener noreferrer">TikTok</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-50">
                    <p className="text-[11px] text-gray-400 tracking-widest uppercase">
                        © 2026 Corporacion de Cueros Bagu. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="text-[11px] text-gray-400 tracking-widest uppercase hover:text-primary-wine transition-colors">Privacy</a>
                        <a href="#" className="text-[11px] text-gray-400 tracking-widest uppercase hover:text-primary-wine transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
