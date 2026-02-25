import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductoService } from '../services/Producto.service';
import { Producto } from '../models/Producto';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

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
                if (data && data.producto_color && data.producto_color.length > 0) {
                    setSelectedColor(data.producto_color[0].color.id_color);
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
            <div className="flex justify-center items-center min-h-screen bg-pure-white text-deep-charcoal">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="min-h-screen bg-pure-white text-deep-charcoal flex flex-col items-center justify-center font-display">
                <h2 className="text-2xl mb-4 font-serif">Producto no encontrado</h2>
                <Link to="/" className="text-accent-gold hover:underline uppercase tracking-widest text-xs font-bold">Volver al inicio</Link>
            </div>
        );
    }

    // Prepare images list (Main image + related images)
    const allImages = [
        { id: -1, url: producto.imagen_url },
        ...(producto.imagenes?.map(img => ({ id: img.id_imagen, url: img.imagen_url })) || [])
    ].filter(img => img.url);

    // Filter unique URLs
    const uniqueImages = Array.from(new Set(allImages.map(a => a.url)))
        .map(url => allImages.find(a => a.url === url)!);

    const activeImage = selectedImage || producto.imagen_url;

    const handleWhatsAppClick = () => {
        const phoneNumber = import.meta.env.VITE_NUMBER_PHONE || '';
        const colorName = producto?.producto_color?.find(c => c.color.id_color === selectedColor)?.color.nombre_color || 'No especificado';

        let message = `Hola, estoy interesado en el producto:\n\n*${producto?.nombre_producto}*\nColor: ${colorName}\nPrecio Base: S/ ${producto?.precio_base.toFixed(2)}`;

        if (producto?.en_oferta && producto?.precio_oferta) {
            message += `\nPrecio de Oferta: S/ ${producto.precio_oferta.toFixed(2)}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const formattedPhone = phoneNumber.replace(/[^0-9]/g, ''); // Extract only numbers
        window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="bg-pure-white text-deep-charcoal font-display antialiased">
            <SEO
                title={`${producto.nombre_producto} | Bagu Luxury Leather`}
                description={producto.descripcion_producto || `Venta de ${producto.nombre_producto}. Calidad premium, material exclusivo y diseño detallado. Compra ahora en línea enviando un mensaje por WhatsApp.`}
                image={activeImage}
                type="product"
            />
            <main className="min-h-screen flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full max-w-[1440px] px-6 md:px-12 py-8 mt-16 md:mt-24">
                    <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-widest font-bold text-gray-400 items-center">
                        <Link className="hover:text-deep-charcoal transition-colors flex items-center gap-1" to="/">
                            <span className="material-symbols-outlined text-[14px]">home</span>
                            Home
                        </Link>
                        <span>/</span>
                        {producto.categoria?.nombre_categoria && (
                            <>
                                <Link className="hover:text-deep-charcoal transition-colors" to={`/collections/${producto.id_categoria}`}>
                                    {producto.categoria.nombre_categoria}
                                </Link>
                                <span>/</span>
                            </>
                        )}
                        <span className="text-deep-charcoal">{producto.nombre_producto}</span>
                    </div>
                </div>

                <div className="w-full max-w-[1440px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Main Image */}
                        <div className="relative group w-full aspect-[4/5] bg-soft-gray overflow-hidden">
                            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-1000 ease-out group-hover:scale-110 object-contain mix-blend-multiply"
                                style={{ backgroundImage: `url('${activeImage}')`, backgroundColor: '#F5F5F5' }}>
                            </div>
                            {producto.en_oferta && (
                                <div className="absolute top-6 left-6">
                                    <span className="bg-primary-wine text-pure-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em]">
                                        Oferta
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {uniqueImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {uniqueImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img.url)}
                                        className={`relative aspect-[4/5] overflow-hidden group ${selectedImage === img.url ? 'border-2 border-accent-gold' : 'border border-gray-100'}`}
                                    >
                                        <div className="w-full h-full bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 transition-all mix-blend-multiply bg-soft-gray"
                                            style={{ backgroundImage: `url('${img.url}')`, backgroundColor: '#F5F5F5' }}>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="lg:col-span-5 flex flex-col relative">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                                        {producto.categoria?.nombre_categoria || 'Luxury Leather'}
                                    </p>
                                    <h1 className="text-primary-wine font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                                        {producto.nombre_producto}
                                    </h1>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                                    <div className="flex items-center gap-4">
                                        <p className="text-3xl text-deep-charcoal font-light">S/ {producto.precio_base.toFixed(2)}</p>
                                        {producto.en_oferta && producto.precio_oferta && (
                                            <p className="text-xl text-gray-400 line-through">S/ {producto.precio_oferta.toFixed(2)}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <div className="flex text-accent-gold">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Valoración</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-500 leading-relaxed text-base font-normal max-w-md">
                                {producto.descripcion_producto || "Una expresión de lujo atemporal. Confeccionada con materiales excepcionales para resistir el paso del tiempo."}
                            </p>

                            <div className="space-y-8">
                                {/* Colors */}
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-deep-charcoal">
                                        Color Seleccionado:
                                        <span className="text-primary-wine ml-2">
                                            {producto.producto_color?.find(c => c.color.id_color === selectedColor)?.color.nombre_color || 'No especificado'}
                                        </span>
                                    </span>
                                    {producto.producto_color && producto.producto_color.length > 0 && (
                                        <div className="flex gap-4">
                                            {producto.producto_color.map((pc) => (
                                                <button
                                                    key={pc.color.id_color}
                                                    onClick={() => setSelectedColor(pc.color.id_color)}
                                                    className={`h-10 w-10 rounded-full border-2 transition-all ${selectedColor === pc.color.id_color ? 'border-pure-white ring-1 ring-accent-gold' : 'border-pure-white hover:ring-1 ring-gray-200'}`}
                                                    style={{ backgroundColor: pc.color.codigo_color || '#000' }}
                                                    aria-label={pc.color.nombre_color}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Dimensions if any */}
                                {producto.tamano && (producto.tamano.ancho || producto.tamano.largo) && (
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-deep-charcoal border-b border-gray-100 pb-2 flex">
                                            Dimensiones:
                                            <span className="text-gray-500 ml-2 normal-case tracking-normal">
                                                {producto.tamano.ancho || '?'}cm x {producto.tamano.largo || '?'}cm
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-pure-white py-6 text-xs font-bold uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                    </svg>
                                    Contáctanos
                                </button>

                                <div className="flex items-center gap-2 text-green-600 text-[10px] font-bold uppercase tracking-widest mt-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Disponible para entrega inmediata
                                </div>
                            </div>

                            <div className="pt-12 space-y-6">
                                <details className="group" open>
                                    <summary className="flex items-center justify-between cursor-pointer list-none border-b border-gray-100 pb-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-deep-charcoal">01. Detalles</h3>
                                        <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <div className="pt-4 pb-2 text-gray-500 text-sm leading-relaxed">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Diseño exclusivo y elegante</li>
                                            <li>Materiales seleccionados de primera calidad</li>
                                            <li>Acabado artesanal detallado</li>
                                        </ul>
                                    </div>
                                </details>

                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer list-none border-b border-gray-100 pb-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-deep-charcoal">02. Materiales</h3>
                                        <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="pt-4 pb-2 text-gray-500 text-sm leading-relaxed">
                                        Seleccionamos exclusivamente cueros y fibras de alta resistencia. Nuestros herrajes están forjados para durar, proporcionando un toque final refinado a cada pieza.
                                    </p>
                                </details>

                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer list-none border-b border-gray-100 pb-4">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-deep-charcoal">03. Envío y Devoluciones</h3>
                                        <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <p className="pt-4 pb-2 text-gray-500 text-sm leading-relaxed">
                                        Envío express de cortesía a todo el país. Ofrecemos una política de devolución de 7 días para artículos sin usar en su empaque original por defectos.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <button
                onClick={handleWhatsAppClick}
                aria-label="Contact on WhatsApp"
                className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-pure-white rounded-full h-16 w-16 flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
            </button>

            <Footer />
        </div>
    );
}
