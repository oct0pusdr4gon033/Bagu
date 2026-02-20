// sections/RefinedEssentials.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductoCard } from "../../models/ProductoCard";
import { supabase } from "../../lib/supabase";

export default function RefinedEssentials() {
    const [products, setProducts] = useState<ProductoCard[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase
                .from('producto')
                .select('*')
                .eq('estado_producto', 'ACTIVO')
                .order('destacado', { ascending: false })
                .limit(4); // We want 4 items for the grid in the template

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

    return (
        <section className="bg-pure-white py-24 lg:py-32">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-100 pb-8">
                    <div className="flex flex-col gap-3">
                        <span className="text-accent-gold text-xs font-bold uppercase tracking-[0.3em]">Nueva Colección</span>
                        <h3 className="text-4xl font-serif text-primary-wine">Productos Destacados</h3>
                    </div>
                    <Link to="/collections" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-accent-gold pb-1 hover:text-accent-gold transition-colors mt-4 md:mt-0">
                        Ver Todos
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((producto) => (
                        <div key={producto.id} className="group flex flex-col gap-6">
                            <Link to={`/product/${producto.id}`} className="relative aspect-[4/5] bg-soft-gray overflow-hidden block">
                                <div className="w-full h-full bg-center bg-cover transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${producto.imagen}')` }}>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500">
                                </div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="w-full bg-white text-primary-wine py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary-wine hover:text-white transition-colors shadow-xl">
                                        Compra Rápida
                                    </button>
                                </div>
                            </Link>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h4 className="text-lg font-serif text-text-main group-hover:text-primary-wine transition-colors">
                                    <Link to={`/product/${producto.id}`}>{producto.nombre}</Link>
                                </h4>
                                <div className="flex items-center gap-2">
                                    <p className="text-accent-gold font-medium tracking-wider">
                                        S/ {producto.en_oferta && producto.precio_oferta != null ? producto.precio_oferta.toFixed(2) : (producto.precio != null ? producto.precio.toFixed(2) : '0.00')}
                                    </p>
                                    {producto.en_oferta && producto.precio_oferta != null && producto.precio != null && (
                                        <p className="text-gray-400 line-through text-sm">
                                            S/ {producto.precio.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
