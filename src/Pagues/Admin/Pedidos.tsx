import { useEffect, useState } from 'react';
import { Venta } from '../../models/Venta';
import { VentaService } from '../../services/Venta.service';
import PedidoHeaderSection from '../../sections/adm/Pedido/PedidoHeaderSection';
import PedidoGridSection from '../../sections/adm/Pedido/PedidoGridSection';
import PedidoDetailModal from '../../sections/adm/Pedido/PedidoDetailModal';

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<Venta[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<Venta[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'Pendiente' | 'En Proceso' | 'Entregado'>('all');
    const [selectedPedido, setSelectedPedido] = useState<Venta | null>(null);

    useEffect(() => {
        loadPedidos();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [pedidos, filter]);

    const loadPedidos = async () => {
        try {
            setLoading(true);
            const data = await VentaService.getAll();
            setPedidos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        if (filter === 'all') {
            setFilteredPedidos(pedidos);
        } else {
            setFilteredPedidos(pedidos.filter(p => p.tipo_pedido?.nombre_tipo === filter));
        }
    };

    const handleUpdateStatus = async (id: number, statusId: number) => {
        if (window.confirm("¿Seguro que deseas cambiar el estado del pedido?")) {
            try {
                await VentaService.updateStatus(id, statusId);
                loadPedidos(); // Reload to refresh data
            } catch (error) {
                alert("Error al actualizar el estado");
            }
        }
    };

    // Calculate counts for header badges
    const counts = {
        total: pedidos.length,
        pending: pedidos.filter(p => p.tipo_pedido?.nombre_tipo === 'Pendiente').length,
        processing: pedidos.filter(p => p.tipo_pedido?.nombre_tipo === 'En Proceso').length,
        delivered: pedidos.filter(p => p.tipo_pedido?.nombre_tipo === 'Entregado').length,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <PedidoHeaderSection
                totalOrders={counts.total}
                pendingOrders={counts.pending}
                processingOrders={counts.processing}
                deliveredOrders={counts.delivered}
                filter={filter}
                onFilterChange={setFilter}
            />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner text-[#742f37]">Cargando...</span>
                </div>
            ) : (
                <PedidoGridSection
                    pedidos={filteredPedidos}
                    onViewDetail={setSelectedPedido}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}

            {selectedPedido && (
                <PedidoDetailModal
                    pedido={selectedPedido}
                    onClose={() => setSelectedPedido(null)}
                />
            )}
        </div>
    );
}
