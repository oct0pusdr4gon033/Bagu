import { Venta } from '../../../models/Venta';
import { Eye } from 'lucide-react';

interface PedidoGridSectionProps {
    pedidos: Venta[];
    onViewDetail: (pedido: Venta) => void;
    onUpdateStatus: (id: number, statusId: number) => void;
}

export default function PedidoGridSection({ pedidos, onViewDetail, onUpdateStatus }: PedidoGridSectionProps) {

    // Map status name to color style
    const getStatusStyle = (statusName: string | undefined) => {
        switch (statusName) {
            case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'En Proceso': return 'bg-blue-100 text-blue-800';
            case 'Entregado': return 'bg-green-100 text-green-800';
            case 'Cancelado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#742f37] text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Cliente</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pedidos.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No hay pedidos registrados
                                </td>
                            </tr>
                        ) : (
                            pedidos.map((pedido) => (
                                <tr key={pedido.id_venta} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">#{pedido.id_venta}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {pedido.cliente ? `${pedido.cliente.nombre_cliente} ${pedido.cliente.apellido_cliente}` : 'Cliente Desconocido'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {pedido.fecha_venta ? new Date(pedido.fecha_venta).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#742f37]">
                                        ${pedido.total_venta?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(pedido.tipo_pedido?.nombre_tipo)}`}>
                                            {pedido.tipo_pedido?.nombre_tipo || 'Sin Estado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onViewDetail(pedido)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Ver detalle"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>

                                            {/* Quick Status Update - assuming IDs 1-4 match standard statuses */}
                                            {/* This could be improved with dynamic status list */}
                                            <select
                                                value={pedido.id_tipo_pedido}
                                                onChange={(e) => onUpdateStatus(pedido.id_venta!, Number(e.target.value))}
                                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#742f37]"
                                            >
                                                <option value="1">Pendiente</option>
                                                <option value="2">En Proceso</option>
                                                <option value="3">Entregado</option>
                                                <option value="4">Cancelado</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
