import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoriaById } from '../services/Categoria.service';
import { ProductoService } from '../services/Producto.service';
import { Categoria } from '../models/Categoria';
import { ProductoCard } from '../models/ProductoCard'; // Using ProductoCard model for the grid
import ProductCard from '../components/ProductCard'; // Reusing the component
import Footer from '../components/layout/Footer';
import { ChevronLeft } from 'lucide-react';

export default function DetalleCategoria() {
    const { id } = useParams<{ id: string }>();
    const [categoria, setCategoria] = useState<Categoria | null>(null);
    const [productos, setProductos] = useState<ProductoCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            setLoading(true);
            try {
                const catId = parseInt(id);

                // 1. Fetch Category Details
                const catData = await getCategoriaById(catId);
                setCategoria(catData);

                // 2. Fetch Products for this Category
                const prodData = await ProductoService.getProductosByCategoria(catId);

                // Map to ProductoCard for display
                const mappedProducts = prodData.map((p: any) => new ProductoCard(
                    p.id_producto,
                    p.nombre_producto,
                    p.precio_base,
                    p.imagen_url,
                    p.precio_oferta,
                    p.en_oferta,
                    p.destacado
                ));
                setProductos(mappedProducts);

            } catch (error) {
                console.error("Error fetching category details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen text-[#1d1516] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
            </div>
        );
    }

    if (!categoria) {
        return (
            <div className="bg-white min-h-screen text-[#1d1516] font-display flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-serif mb-4">Categoría no encontrada</h1>
                <Link to="/collections" className="text-accent-gold hover:underline">
                    Volver a Colecciones
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-[#1d1516] font-display">
            {/* Header */}
            <div className="pt-24 pb-12 px-6 text-center relative">
                <Link
                    to="/collections"
                    className="absolute left-6 top-24 md:left-12 flex items-center text-gray-400 hover:text-[#1d1516] transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Volver
                </Link>

                <p className="text-xs tracking-[0.3em] text-accent-gold mb-3 uppercase">
                    Colección
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#1d1516] mb-4">
                    {categoria.nombre_categoria}
                </h1>
                {categoria.descripcion_categoria && (
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {categoria.descripcion_categoria}
                    </p>
                )}
                <div className="w-12 h-px bg-accent-gold mx-auto mt-6" />
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                {productos.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p>No se encontraron productos en esta colección.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {productos.map((producto) => (
                            <ProductCard key={producto.id} productoCard={producto} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
