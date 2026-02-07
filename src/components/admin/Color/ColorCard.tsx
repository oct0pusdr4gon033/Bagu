import { Colores } from '../../../models/Colores';

interface ColorCardProps {
    color: Colores;
    onEdit: (color: Colores) => void;
    onDelete: (id: number) => void;
}

export default function ColorCard({ color, onEdit, onDelete }: ColorCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
                {/* Color Preview */}
                <div
                    className="w-16 h-16 rounded-lg border border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: color.codigo_color }}
                />

                {/* Color Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {color.nombre_color}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                        {color.codigo_color}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(color)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                    <span className="text-sm font-medium">Editar</span>
                </button>

                <button
                    onClick={() => color.id_color && onDelete(color.id_color)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                    <span className="text-sm font-medium">Eliminar</span>
                </button>
            </div>
        </div>
    );
}
