import Button from '../../../components/admin/Button';

interface ClientHeaderSectionProps {
    onOpenModal: () => void;
    filter: 'all' | 'active' | 'inactive';
    onFilterChange: (filter: 'all' | 'active' | 'inactive') => void;
}

export default function ClientHeaderSection({ onOpenModal, filter, onFilterChange }: ClientHeaderSectionProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#742f37]/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#742f37] text-[28px]">
                            group
                        </span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#742f37]">
                            Gestión de Clientes
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Administra la información de los clientes registrados
                        </p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    icon={<span className="material-symbols-outlined text-[20px]">add</span>}
                    onClick={onOpenModal}
                >
                    Nuevo Cliente
                </Button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
                <button
                    onClick={() => onFilterChange('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
                        ? 'bg-[#742f37] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => onFilterChange('active')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'active'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Activos
                </button>
                <button
                    onClick={() => onFilterChange('inactive')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'inactive'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Inactivos
                </button>
            </div>
        </div>
    );
}
