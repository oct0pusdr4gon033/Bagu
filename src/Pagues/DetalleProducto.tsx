import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductoService } from '../services/Producto.service';
import { Producto } from '../models/Producto';
// Navbar is not used here as it is in MainLayout, removing import
import Footer from '../components/layout/Footer';

export default function DetalleProducto() {
    const { id } = useParams<{ id: string }>();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<number | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const data = await ProductoService.fetchProductById(Number(id));
                setProducto(data);
                if (data && data.imagen_url) {
                    setSelectedImage(data.imagen_url);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-background-dark text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center">
                <h2 className="text-2xl mb-4">Producto no encontrado</h2>
                <Link to="/" className="text-accent-gold hover:underline">Volver al inicio</Link>
            </div>
        );
    }

    // Prepare images list (Main image + related images)
    const allImages = [
        { id: -1, url: producto.imagen_url },
        ...(producto.imagenes?.map(img => ({ id: img.id_imagen, url: img.imagen_url })) || [])
    ].filter(img => img.url);

    // Filter unique URLs just in case
    const uniqueImages = Array.from(new Set(allImages.map(a => a.url)))
        .map(url => {
            return allImages.find(a => a.url === url)!;
        });


    return (
        <div className="bg-white min-h-screen font-display text-[#1d1516]">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-4 text-sm text-gray-500 uppercase tracking-wide">
                <Link to="/" className="hover:text-[#742f37] transition-colors"><span className="material-symbols-outlined align-middle text-lg mr-1">home</span></Link>
                <span className="mx-2">/</span>
                {producto.categoria?.nombre_categoria && (
                    <>
                        <Link to={`/collections/${producto.id_categoria}`} className="hover:text-[#742f37] transition-colors">
                            {producto.categoria.nombre_categoria}
                        </Link>
                        <span className="mx-2">/</span>
                    </>
                )}
                <span className="text-[#1d1516] font-medium">{producto.nombre_producto}</span>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 md:h-[600px] scrollbar-thin scrollbar-thumb-gray-200">
                            {uniqueImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img.url)}
                                    className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all duration-300 ${selectedImage === img.url ? 'border-[#742f37]' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img src={img.url} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden relative group h-[400px] md:h-[600px]">
                            <img
                                src={selectedImage || producto.imagen_url}
                                alt={producto.nombre_producto}
                                className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4">
                                <button className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-[#742f37] transition-colors">
                                    <span className="material-symbols-outlined text-xl">zoom_in</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-serif text-[#1d1516] mb-2">
                                {producto.nombre_producto}
                            </h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-2xl font-medium text-[#742f37]">
                                    S/ {producto.precio_base.toFixed(2)}
                                </span>
                                {producto.en_oferta && producto.precio_oferta && (
                                    <span className="text-lg text-gray-400 line-through">
                                        S/ {producto.precio_oferta.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Medidas Badge if available */}
                            {producto.tamano && (producto.tamano.ancho || producto.tamano.largo) && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider mb-6">
                                    <span className="material-symbols-outlined text-sm">straighten</span>
                                    {producto.tamano.ancho || '?'}cm x {producto.tamano.largo || '?'}cm
                                </div>
                            )}
                        </div>

                        {/* Colors */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                                Colores disponibles: <span className="text-gray-500 font-normal ml-1">
                                    {producto.producto_color?.find(c => c.color.id_color === selectedColor)?.color.nombre_color || 'Seleccionar'}
                                </span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {producto.producto_color?.map((pc) => (
                                    <button
                                        key={pc.color.id_color}
                                        onClick={() => setSelectedColor(pc.color.id_color)}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === pc.color.id_color ? 'border-[#742f37] scale-110 shadow-sm' : 'border-transparent hover:border-gray-200'}`}
                                        title={pc.color.nombre_color}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full border border-gray-100 shadow-inner"
                                            style={{ backgroundColor: pc.color.codigo_color || '#000' }}
                                        />
                                    </button>
                                ))}
                                {(!producto.producto_color || producto.producto_color.length === 0) && (
                                    <span className="text-sm text-gray-400 italic">No hay colores especificados</span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <button className="bg-[#1d1516] text-white py-4 px-8 rounded-none hover:bg-[#742f37] transition-colors uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2">
                                Agregar al Carrito
                            </button>
                            <button className="border border-gray-300 text-gray-600 py-4 px-8 rounded-none hover:border-[#742f37] hover:text-[#742f37] transition-colors uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">favorite_border</span>
                                Favoritos
                            </button>
                        </div>

                        {/* Accordions / Info Sections */}
                        <div className="border-t border-gray-200">
                            {/* Description */}
                            <details className="group border-b border-gray-200" open>
                                <summary className="flex justify-between items-center py-4 cursor-pointer list-none text-sm font-medium uppercase tracking-wider hover:text-[#742f37] transition-colors">
                                    Descripción
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="pb-6 text-gray-600 leading-relaxed text-sm">
                                    {producto.descripcion_producto || "Sin descripción disponible para este producto."}
                                </div>
                            </details>

                            {/* Details (Placeholder) */}
                            <details className="group border-b border-gray-200">
                                <summary className="flex justify-between items-center py-4 cursor-pointer list-none text-sm font-medium uppercase tracking-wider hover:text-[#742f37] transition-colors">
                                    Detalles
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="pb-6 text-gray-600 leading-relaxed text-sm">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Cuero 100% Genuino</li>
                                        <li>Hecho a mano en Perú</li>
                                        <li>Acabados de alta calidad</li>
                                        {/* Dynamic details could go here if available in DB */}
                                    </ul>
                                </div>
                            </details>

                            {/* Warranty */}
                            <details className="group border-b border-gray-200">
                                <summary className="flex justify-between items-center py-4 cursor-pointer list-none text-sm font-medium uppercase tracking-wider hover:text-[#742f37] transition-colors">
                                    Garantías y Cambios
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="pb-6 text-gray-600 leading-relaxed text-sm">
                                    <p>Todos nuestros productos cuentan con garantía por defectos de fabricación. Se aceptan cambios y devoluciones dentro de los 7 días posteriores a la compra, siempre que el producto esté sin uso y en su empaque original.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Products Section could be added here later */}

            <Footer />
        </div>
    );
}
