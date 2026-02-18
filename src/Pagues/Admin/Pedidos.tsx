import { useEffect, useState } from 'react';
import { Venta } from '../../models/Venta';
import { EstadoPedido } from '../../models/EstadoPedido';
import { VentaService } from '../../services/Venta.service';
import { getEstados } from '../../services/Estado.service';
import { supabase } from '../../lib/supabase';
import PedidoHeaderSection from '../../sections/adm/Pedido/PedidoHeaderSection';
import PedidoGridSection from '../../sections/adm/Pedido/PedidoGridSection';
import PedidoDetailModal from '../../sections/adm/Pedido/PedidoDetailModal';

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<Venta[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<Venta[]>([]);
    const [estados, setEstados] = useState<EstadoPedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'Pendiente' | 'En Proceso' | 'Entregado'>('all');
    const [selectedPedido, setSelectedPedido] = useState<Venta | null>(null);

    useEffect(() => {
        loadPedidos();
        loadEstados();
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            console.log("Current Session:", data.session);
            console.log("User Role:", data.session?.user?.role);
        };
        checkSession();
        applyFilters();
    }, [pedidos, filter]);

    const loadPedidos = async () => {
        try {
            setLoading(true);
            const data = await VentaService.getAll();
            console.log('Pedidos cargados:', data);
            setPedidos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadEstados = async () => {
        try {
            const data = await getEstados();
            console.log('Estados cargados:', data);
            setEstados(data);
        } catch (error) {
            console.error('Error cargando estados:', error);
        }
    };

    const applyFilters = () => {
        if (filter === 'all') {
            setFilteredPedidos(pedidos);
        } else {
            setFilteredPedidos(pedidos.filter(p => p.estado_pedido?.nombre_estado === filter));
        }
    };

    const handleUpdateStatus = async (id: number, statusId: number) => {
        console.log(`[Pedidos] Handle update status called. ID: ${id}, StatusID: ${statusId}`);
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
        pending: pedidos.filter(p => p.estado_pedido?.nombre_estado === 'Pendiente').length,
        processing: pedidos.filter(p => p.estado_pedido?.nombre_estado === 'En Proceso').length,
        delivered: pedidos.filter(p => p.estado_pedido?.nombre_estado === 'Entregado').length,
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
                    estados={estados}
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
