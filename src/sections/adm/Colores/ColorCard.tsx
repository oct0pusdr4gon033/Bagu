import { Colores } from '../../../models/Colores';

interface ColorCardProps {
    color: Colores;
    onEdit: (color: Colores) => void;
    onToggleActive: (id: number, currentStatus: boolean) => void;
}

export default function ColorCard({ color, onEdit, onToggleActive }: ColorCardProps) {
    const isActive = color.estado !== false; // Por defecto true si no está definido

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow relative ${!isActive ? 'opacity-60' : ''}`}>
            {/* Badge de estado */}
            {!isActive && (
                <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded">
                        Inactivo
                    </span>
                </div>
            )}

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
                    onClick={() => color.id_color && onToggleActive(color.id_color, isActive)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-green-600 hover:bg-green-50'
                        }`}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {isActive ? 'toggle_off' : 'toggle_on'}
                    </span>
                    <span className="text-sm font-medium">
                        {isActive ? 'Desactivar' : 'Activar'}
                    </span>
                </button>
            </div>
        </div>
    );
}
