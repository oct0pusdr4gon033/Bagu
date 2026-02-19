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
                                    <img src="/logo.png" alt="logo" className="w-12 h-12" />
                                </span>
                            </div>

                            <p className="text-[#b2a4a6] text-sm max-w-[250px]">
                                Definiendo el estándar de los artículos de cuero para la era moderna.                            </p>
                        </div>

                        <div className="flex gap-12 md:gap-24 flex-wrap">

                            {/* Shop */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase">
                                    Productos
                                </h4>
                                <div className="flex flex-col gap-2 text-[#b2a4a6] text-sm">
                                    <a className="hover:text-accent-gold transition-colors" href="/collections/2">Carteras</a>
                                    <a className="hover:text-accent-gold transition-colors" href="/collections/3">Bolsos</a>
                                    <a className="hover:text-accent-gold transition-colors" href="/collections/1">Morrales</a>
                                    <a className="hover:text-accent-gold transition-colors" href="/collections/7">Billeteras</a>
                                    <a className="hover:text-accent-gold transition-colors" href="/collections/6">Maletines</a>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-white font-bold text-sm tracking-widest uppercase">
                                    Empresa
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
                                    Redes Sociales
                                </h4>
                                <div className="flex gap-4 text-white text-sm">
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        <a href="https://www.instagram.com/agucuero/">Instagram</a>
                                    </span>
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        <a href="https://www.facebook.com/agucuero">Facebook</a>
                                    </span>
                                    <span className="cursor-pointer hover:text-accent-gold transition-colors">
                                        <a href="https://www.tiktok.com/@agucuero">TikTok</a>
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
