export default function ContactSupportSection() {
    return (
        <section className="bg-soft-gray py-24">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12 text-center">
                <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
                    <h3 className="text-3xl font-serif text-primary-wine">El Diario</h3>

                    <p className="text-gray-500 font-light">
                        Únete a nuestro círculo íntimo para obtener acceso anticipado a colecciones de edición limitada e historias de artesanía.
                    </p>

                    <form className="w-full flex flex-col sm:flex-row gap-0 group" onClick={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Tu Correo Electrónico"
                            className="flex-1 bg-white border-gray-200 focus:ring-0 focus:border-accent-gold px-6 py-4 text-sm font-light tracking-wide outline-none transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-primary-wine text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-gold transition-colors duration-500"
                        >
                            Suscribirse
                        </button>
                    </form>

                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        Al suscribirte, aceptas nuestra Política de Privacidad
                    </p>
                </div>
            </div>
        </section>
    );
}
