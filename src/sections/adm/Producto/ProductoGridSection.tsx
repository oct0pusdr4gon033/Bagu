import { Edit, Trash2, Tag, Star } from 'lucide-react';
import { Producto } from '../../../models/Producto';

interface ProductoGridSectionProps {
    productos: Producto[];
    onEdit: (producto: Producto) => void;
    onDelete: (producto: Producto) => void;
}

export default function ProductoGridSection({ productos, onEdit, onDelete }: ProductoGridSectionProps) {
    if (!productos || productos.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                <p className="text-gray-500 text-lg">No se encontraron productos.</p>
                <p className="text-gray-400 text-sm mt-2">Intenta ajustar los filtros o agrega un nuevo producto.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
                <div
                    key={producto.id_producto}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group relative flex flex-col"
                >
                    {/* Image Area */}
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                        {producto.imagen_url ? (
                            <img
                                src={producto.imagen_url}
                                alt={producto.nombre_producto}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-3xl">📷</span>
                            </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {producto.destacado && (
                                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Destacado
                                </span>
                            )}
                            {producto.en_oferta && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
                                    <Tag className="w-3 h-3 mr-1 fill-current" />
                                    Oferta
                                </span>
                            )}
                        </div>

                        {/* Quick Actions (only visible on hover for desktop, always visible on mobile if tweaked) */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            <button
                                onClick={() => onEdit(producto)}
                                className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-[#742f37] transition-colors"
                                title="Editar"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(producto)}
                                className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600 transition-colors"
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={producto.nombre_producto}>
                                {producto.nombre_producto}
                            </h3>
                        </div>

                        <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">
                            {producto.descripcion_producto}
                        </p>

                        <div className="mt-auto flex justify-between items-end border-t pt-3 border-gray-100">
                            <div>
                                <span className="text-xs text-gray-400 block mb-1">
                                    {producto.categoria?.nombre_categoria || 'Sin Categoría'}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    {producto.en_oferta && producto.precio_oferta ? (
                                        <>
                                            <span className="text-lg font-bold text-red-600">
                                                ${(producto.precio_oferta ?? 0).toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${(producto.precio_base ?? 0).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-[#742f37]">
                                            ${(producto.precio_base ?? 0).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-2 md:hidden"> {/* Mobile actions fallback */}
                                <button onClick={() => onEdit(producto)} className="text-gray-400 hover:text-[#742f37]">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button onClick={() => onDelete(producto)} className="text-gray-400 hover:text-red-600">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
