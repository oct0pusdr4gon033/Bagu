import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../services/Categoria.service';
import { Categoria } from '../models/Categoria';
import Footer from '../components/layout/Footer';

export default function Colecciones() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const data = await getCategorias();
                // Filter only active categories
                setCategorias(data.filter(c => c.estado_categoria !== false));
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategorias();
    }, []);

    return (
        <div className="bg-white min-h-screen text-[#1d1516] font-display">
            {/* Reusing Hero or a simplified header? Let's use a simple header for now or reusing Hero might be too much. 
                Let's make a simple header. */}
            <div className="pt-24 pb-12 px-6 text-center">
                <p className="text-xs tracking-[0.3em] text-accent-gold mb-3 uppercase">
                    Explora
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#1d1516] mb-6">
                    Nuestras Colecciones
                </h1>
                <div className="w-12 h-px bg-accent-gold mx-auto" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categorias.map((categoria) => (
                            <Link
                                key={categoria.id_categoria}
                                to={`/collections/${categoria.id_categoria}`}
                                className="group relative overflow-hidden rounded-lg aspect-[4/3] block bg-gray-50 border border-gray-200 hover:border-accent-gold transition-colors duration-300"
                            >
                                {/* We don't have category images in the model yet, so we'll use a placeholder or pattern */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 group-hover:scale-105 transition-transform duration-700">
                                    {categoria.url_categoria ? (
                                        <img
                                            src={categoria.url_categoria}
                                            alt={categoria.nombre_categoria || 'Categoría'}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-6xl text-[#342d2d] font-serif opacity-20 select-none">
                                            {categoria.nombre_categoria?.charAt(0) || ''}
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-accent-gold transition-colors">
                                        {categoria.nombre_categoria || 'Categoría'}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300">
                                        {categoria.descripcion_categoria || 'Descubre los productos de esta colección.'}
                                    </p>
                                    <div className="mt-4 flex items-center text-accent-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        Ver Productos <span className="ml-2">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
