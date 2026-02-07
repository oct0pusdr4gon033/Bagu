import { Categoria } from '../../../models/Categoria';

interface CategoryGridSectionProps {
    categorias: Categoria[];
    onEdit: (categoria: Categoria) => void;
    onToggleActive: (id: number, currentStatus: boolean) => void;
}

export default function CategoryGridSection({ categorias, onEdit, onToggleActive }: CategoryGridSectionProps) {
    if (categorias.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No hay categorías registradas</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map((categoria) => (
                <div
                    key={categoria.id_categoria}
                    className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${categoria.estado_categoria === false ? 'border-orange-200 bg-orange-50/10' : 'border-gray-100'
                        }`}
                >
                    {/* Imagen de la categoría */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                        {categoria.url_categoria ? (
                            <img
                                src={categoria.url_categoria}
                                alt={categoria.nombre_categoria}
                                className={`w-full h-full object-cover transition-opacity ${categoria.estado_categoria === false ? 'opacity-50' : ''}`}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="material-symbols-outlined text-5xl">image_not_supported</span>
                            </div>
                        )}
                        {categoria.estado_categoria === false && (
                            <div className="absolute top-3 right-3 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                                Inactivo
                            </div>
                        )}
                    </div>

                    <div className="p-5">
                        <h3 className="text-lg font-bold text-[#742f37] mb-2">
                            {categoria.nombre_categoria}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-2 min-h-[40px]">
                            {categoria.descripcion_categoria || "Sin descripción"}
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(categoria)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Editar
                            </button>
                            <button
                                onClick={() => onToggleActive(categoria.id_categoria!, categoria.estado_categoria ?? true)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${categoria.estado_categoria !== false
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {categoria.estado_categoria !== false ? 'delete' : 'restore_from_trash'}
                                </span>
                                {categoria.estado_categoria !== false ? 'Desactivar' : 'Activar'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
