import OurStorySection from "../sections/landing/OurHistory";

export default function NuestraHistoria() {
    return (
        <div className="flex-1 bg-pure-white pt-24">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12 mb-12 text-center">
                <h1 className="text-4xl lg:text-6xl font-serif text-primary-wine mb-6">Sobre Nosotros</h1>
                <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                    Descubre el legado de nuestra marca y la dedicación artesanal que ponemos en cada una de nuestras piezas de cuero.
                </p>
            </div>
            <OurStorySection />
        </div>
    );
}
