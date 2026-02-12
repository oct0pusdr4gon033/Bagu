import { Filter } from 'lucide-react';
import { Categoria } from '../../../models/Categoria';
import Button from '../../../components/admin/Button';

interface ProductoHeaderSectionProps {
    onOpenModal: () => void;
    categorias: Categoria[];
    selectedCategory: number | undefined;
    onCategoryChange: (id: number | undefined) => void;
    minPrice: number | undefined;
    maxPrice: number | undefined;
    onPriceChange: (min: number | undefined, max: number | undefined) => void;
}

export default function ProductoHeaderSection({
    onOpenModal,
    categorias,
    selectedCategory,
    onCategoryChange,
    minPrice,
    maxPrice,
    onPriceChange
}: ProductoHeaderSectionProps) {
    return (
        <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#742f37]/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#742f37] text-[28px]">
                            inventory_2
                        </span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#742f37]">
                            Gestión de Productos
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Administra tu catálogo de productos
                        </p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    icon={<span className="material-symbols-outlined text-[20px]">add</span>}
                    onClick={onOpenModal}
                >
                    Nuevo Producto
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center text-gray-500 font-medium mr-2">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar por:
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory || ''}
                    onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37] text-sm min-w-[200px]"
                >
                    <option value="">Todas las Categorías</option>
                    {categorias.map(cat => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.nombre_categoria}
                        </option>
                    ))}
                </select>

                {/* Price Filter */}
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min $"
                        value={minPrice || ''}
                        onChange={(e) => onPriceChange(e.target.value ? Number(e.target.value) : undefined, maxPrice)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37] text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        placeholder="Max $"
                        value={maxPrice || ''}
                        onChange={(e) => onPriceChange(minPrice, e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37] text-sm"
                    />
                </div>

                {(selectedCategory !== undefined || minPrice !== undefined || maxPrice !== undefined) && (
                    <button
                        onClick={() => {
                            onCategoryChange(undefined);
                            onPriceChange(undefined, undefined);
                        }}
                        className="text-sm text-red-600 hover:text-red-800 underline ml-auto md:ml-0"
                    >
                        Limpiar filtros
                    </button>
                )}
            </div>
        </div>
    );
}
