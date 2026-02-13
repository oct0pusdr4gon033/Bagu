import Button from '../../../components/admin/Button';
import { useNavigate } from 'react-router-dom';

interface PedidoHeaderSectionProps {
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    deliveredOrders: number;
    filter: 'all' | 'Pendiente' | 'En Proceso' | 'Entregado';
    onFilterChange: (filter: 'all' | 'Pendiente' | 'En Proceso' | 'Entregado') => void;
}

export default function PedidoHeaderSection({
    totalOrders,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    filter,
    onFilterChange
}: PedidoHeaderSectionProps) {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#742f37]/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#742f37] text-[28px]">
                            shopping_cart
                        </span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#742f37]">
                            Gestión de Pedidos
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Administra todos los pedidos de tus clientes
                        </p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    icon={<span className="material-symbols-outlined text-[20px]">add</span>}
                    onClick={() => navigate('/admin/pedidos/nuevo')}
                >
                    Nuevo Pedido
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
                    Todos ({totalOrders})
                </button>
                <button
                    onClick={() => onFilterChange('Pendiente')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'Pendiente'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Pendientes ({pendingOrders})
                </button>
                <button
                    onClick={() => onFilterChange('En Proceso')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'En Proceso'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    En Proceso ({processingOrders})
                </button>
                <button
                    onClick={() => onFilterChange('Entregado')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'Entregado'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Entregados ({deliveredOrders})
                </button>
            </div>
        </div>
    );
}
