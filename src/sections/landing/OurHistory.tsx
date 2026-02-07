export default function OurStorySection() {
    return (
        <section className="relative bg-[#161313] py-20 lg:py-28 text-white">
            <div className="flex justify-center w-full px-6 lg:px-10">
                <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text Side */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-8 bg-accent-gold"></div>
                                <span className="text-accent-gold text-xs font-bold tracking-[0.2em] uppercase">
                                    Nuestra Historia
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-tight">
                                Tradición & Calidad <br />
                                <span className="text-white/50 italic">
                                    En Cada Detalle
                                </span>
                            </h2>

                            <p className="text-[#b2a4a6] text-lg font-light leading-relaxed max-w-[540px]">
                                Creemos en el arte de hacer las cosas bien. Cada pieza es creada con
                                materiales seleccionados y procesos responsables, pensados para durar
                                y contar su propia historia con el tiempo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-accent-gold mb-1">
                                    <span className="material-symbols-outlined text-[32px]">
                                        spa
                                    </span>
                                </div>
                                <h4 className="text-white text-lg font-serif">
                                    Curtido Natural
                                </h4>
                                <p className="text-[#b2a4a6] text-sm">
                                    Procesos responsables que realzan la textura y el carácter del cuero.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-accent-gold mb-1">
                                    <span className="material-symbols-outlined text-[32px]">
                                        brush
                                    </span>
                                </div>
                                <h4 className="text-white text-lg font-serif">
                                    Acabados Artesanales
                                </h4>
                                <p className="text-[#b2a4a6] text-sm">
                                    Detalles trabajados a mano para una durabilidad superior.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="w-fit h-12 px-8 border border-white/20 rounded-sm text-white text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white">
                                Conoce Más
                            </button>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative order-1 lg:order-2">
                        <div className="absolute -top-4 -right-4 w-full h-full border border-accent-gold/30 z-0 hidden lg:block"></div>

                        <div
                            className="relative z-10 w-full aspect-[4/5] lg:aspect-square bg-cover bg-center rounded-sm shadow-2xl"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp7Bsgz9FgJ6buQHH2sHWpC7OHy5gCbjaDtRJf9JiHnShezQKNVqkCy5d2yT0dMWeTqPUYmLHUID6TVn4mxip_bnBieV-sIZb0UbTXXg50uwPx6XvyrjEz_xdyufrRpRLvDkWo5izHRhyRSBUwh7PXIzpAmL5ZKuWhxG0rez6dPEIzzfasqwmU97-Cuc19eTKebk7Zh1isnn-3fZPelyGzv3_k4ifZkft0wFD2DLTVkI0FGSiz-QDYeHn7OOk_Q_yMQ44Q1adGwKY')",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161313] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
