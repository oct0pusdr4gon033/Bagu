// sections/RefinedEssentials.tsx
import ProductCard from "../../components/ProductCard";
import { ProductoCard } from "../../models/ProductoCard";

interface Props {
    productoCard: ProductoCard[];
}

export default function RefinedEssentials({ productoCard }: Props) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24">

            <div className="text-center mb-16">
                <p className="text-xs tracking-[0.3em] text-white-500 mb-3">
                    Nuestros Productos
                </p>

                <h2 className="font-serif text-3xl md:text-4xl text-[#1d1516]">
                    Productos Destacados
                </h2>

                <div className="w-12 h-px bg-accent-gold mx-auto mt-6" />
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                {productoCard.slice(0, 5).map((productoCard) => (
                    <ProductCard
                        key={productoCard.id}
                        productoCard={productoCard}
                    />
                ))}
            </div>
        </section>
    );
}
