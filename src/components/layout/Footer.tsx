export default function Footer() {
    return (
        <footer className="bg-[#1d1516] border-t border-[#342d2d] pt-12 pb-8">
            <div className="flex justify-center w-full px-6 lg:px-10">
                <div className="max-w-[1280px] w-full flex flex-col gap-12">

                    {/* Top */}
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-accent-gold">
                                    Bagu
                                </span>
                                <h2 className="text-lg font-serif font-bold tracking-wide">
                                    Distinción a la mano
                                </h2>
                            </div>

                            <p className="text-[#b2a4a6] text-sm max-w-[250px]">
                                Definiendo el estándar de los artículos de cuero para la era moderna.                            </p>
                        </div>

                        <div className="flex gap-12 md:gap-24 flex-wrap">

                            {/* Shop */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase">
                                    Compra
                                </h4>
                                <div className="flex flex-col gap-2 text-[#b2a4a6] text-sm">
                                    <a className="hover:text-accent-gold transition-colors" href="#">Carteras</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Bolsos</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Accesorios</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Novedades</a>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase">
                                    Compañia
                                </h4>
                                <div className="flex flex-col gap-2 text-[#b2a4a6] text-sm">
                                    <a className="hover:text-accent-gold transition-colors" href="#">About Us</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Sustainability</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Contact</a>
                                    <a className="hover:text-accent-gold transition-colors" href="#">Careers</a>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase">
                                    Siguenos
                                </h4>
                                <div className="flex gap-4 text-white text-sm">
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        Instagram
                                    </span>
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        Facebook
                                    </span>
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        TikTok
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-[#342d2d] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#b2a4a6]">
                        <p>© 2026 Corporacion de Cueros Bagu. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-white" href="#">Privacy Policy</a>
                            <a className="hover:text-white" href="#">Terms of Service</a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
