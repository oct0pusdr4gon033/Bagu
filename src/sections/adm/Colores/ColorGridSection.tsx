import { Colores } from '../../../models/Colores';
import ColorCard from './ColorCard';

interface ColorGridSectionProps {
    colores: Colores[];
    onEdit: (color: Colores) => void;
    onToggleActive: (id: number, currentStatus: boolean) => void;
}

export default function ColorGridSection({ colores, onEdit, onToggleActive }: ColorGridSectionProps) {
    if (colores.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-gray-400 text-[40px]">
                        palette
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No hay colores en esta categoría
                </h3>
                <p className="text-gray-600">
                    Usa los filtros para ver otros colores o crea uno nuevo
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colores.map((color) => (
                <ColorCard
                    key={color.id_color}
                    color={color}
                    onEdit={onEdit}
                    onToggleActive={onToggleActive}
                />
            ))}
        </div>
    );
}
