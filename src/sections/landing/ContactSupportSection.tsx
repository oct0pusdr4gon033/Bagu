export default function ContactSupportSection() {
    return (
        <section className="bg-primary text-white py-16">
            <div className="flex justify-center w-full px-6 lg:px-10">
                <div className="max-w-[700px] w-full text-center flex flex-col gap-6">

                    <h3 className="font-serif text-3xl font-medium">
                        Atención Personalizada
                    </h3>

                    <p className="text-white/80 font-light">
                        ¿Tienes dudas sobre nuestros productos o necesitas una recomendación?
                        Nuestro equipo está listo para ayudarte.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[480px] mx-auto">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-sm focus:outline-none focus:border-accent-gold transition-colors text-sm"
                        />

                        <button
                            className="bg-[#1d1516] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#1d1516] transition-colors rounded-sm"
                        >
                            Contactar
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
