import ReviewCard from "../../components/ReviewCard";

export function ReviewsSection() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-[1200px] mx-auto px-6">

                <h2 className="section-titles">
                    Opiniones de nuestros clientes
                </h2>

                <p className="text-center text-sm text-gray-500 mb-10">
                    Personas que ya compraron y usan nuestras carteras
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <ReviewCard
                        name="Mateo R."
                        rating={5}
                        comment="Un excelente regalo para mi esposa, le encantó."
                    />

                    <ReviewCard
                        name="Monica P."
                        rating={4}
                        comment="Compre para el trabajo, es muy cómoda y elegante."
                    />

                    <ReviewCard
                        name="Fernando A."
                        rating={5}
                        comment="Excelente precio, modelos similares los encontre caros en otra pagina "
                    />
                </div>

            </div>
        </section>
    )

}