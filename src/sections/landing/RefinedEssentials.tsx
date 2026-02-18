// sections/RefinedEssentials.tsx
import { useEffect, useState, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { ProductoCard } from "../../models/ProductoCard";
import { supabase } from "../../lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RefinedEssentials() {
    const [products, setProducts] = useState<ProductoCard[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase
                .from('producto')
                .select('*')
                .eq('estado_producto', 'ACTIVO')
                .order('destacado', { ascending: false }) // Featured first
                .limit(10);

            if (data) {
                const mapped = data.map((p: any) => new ProductoCard(
                    p.id_producto,
                    p.nombre_producto,
                    p.precio_base,
                    p.imagen_url,
                    p.precio_oferta,
                    p.en_oferta,
                    p.destacado
                ));
                setProducts(mapped);
            }
        };

        fetchProducts();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 300; // Approx card width + gap
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 relative group">

            <div className="text-center mb-16">
                <p className="text-xs tracking-[0.3em] text-white-500 mb-3 uppercase text-gray-500">
                    Nuestros Productos
                </p>

                <h2 className="font-serif text-3xl md:text-4xl text-[#1d1516]">
                    Productos Destacados
                </h2>

                <div className="w-12 h-px bg-accent-gold mx-auto mt-6" />
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-[#742f37] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 duration-300 disabled:opacity-0"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-[#742f37] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 duration-300"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Grid/Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((productoCard) => (
                        <div key={productoCard.id} className="min-w-[280px] md:min-w-[300px] snap-center">
                            <ProductCard productoCard={productoCard} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
