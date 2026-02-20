export default function OurStorySection() {
    return (
        <section className="bg-pure-white py-24 lg:py-32">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32">
                    <div className="relative aspect-square lg:aspect-[4/5] bg-soft-gray overflow-hidden border-[1px] border-accent-gold p-4 lg:p-8">
                        <div className="w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp7Bsgz9FgJ6buQHH2sHWpC7OHy5gCbjaDtRJf9JiHnShezQKNVqkCy5d2yT0dMWeTqPUYmLHUID6TVn4mxip_bnBieV-sIZb0UbTXXg50uwPx6XvyrjEz_xdyufrRpRLvDkWo5izHRhyRSBUwh7PXIzpAmL5ZKuWhxG0rez6dPEIzzfasqwmU97-Cuc19eTKebk7Zh1isnn-3fZPelyGzv3_k4ifZkft0wFD2DLTVkI0FGSiz-QDYeHn7OOk_Q_yMQ44Q1adGwKY')" }}>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-accent-gold text-xs font-bold uppercase tracking-[0.3em]">Desde 1984</span>
                            <h2 className="text-4xl lg:text-5xl font-serif text-primary-wine leading-tight">
                                Calidad de Herencia <br />
                                <span className="italic font-light opacity-60">En Cada Costura</span>
                            </h2>
                            <div className="w-20 h-[2px] bg-accent-gold mt-2"></div>
                        </div>

                        <p className="text-lg text-gray-600 font-light leading-relaxed">
                            Nuestros maestros artesanos emplean técnicas centenarias, pintando bordes a mano y cosiendo a mano con hilo de lino encerado para asegurar que tu pieza dure por generaciones. Esto no es solo una billetera; es un legado de precisión.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                            <div className="flex flex-col gap-3">
                                <span className="material-symbols-outlined text-primary-wine" style={{ fontSize: '36px' }}>spa</span>
                                <h5 className="font-serif text-lg">Curtido Natural</h5>
                                <p className="text-sm text-gray-500">Extractos orgánicos de castaño y quebracho para un acabado natural.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="material-symbols-outlined text-primary-wine" style={{ fontSize: '36px' }}>hand_gesture</span>
                                <h5 className="font-serif text-lg">Bruñido a Mano</h5>
                                <p className="text-sm text-gray-500">Pulido minucioso de bordes para una sensación manual perfecta y lujosa.</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-wine">
                                Explora Nuestro Taller
                                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
