import { Venta } from '../../../models/Venta';
import { EstadoPedido } from '../../../models/EstadoPedido';
import { Eye } from 'lucide-react';

interface PedidoGridSectionProps {
    pedidos: Venta[];
    estados: EstadoPedido[];
    onViewDetail: (pedido: Venta) => void;
    onUpdateStatus: (id: number, statusId: number) => void;
}

export default function PedidoGridSection({ pedidos, estados, onViewDetail, onUpdateStatus }: PedidoGridSectionProps) {

    // Map status name to color style
    const getStatusStyle = (statusName: string | undefined) => {
        switch (statusName) {
            case 'Pendiente': return 'bg-amber-100 text-amber-900';
            case 'En Proceso': return 'bg-amber-100 text-amber-900';
            case 'Entregado': return 'bg-green-100 text-green-800';
            case 'Cancelado': return 'bg-red-100 text-red-800';
            default: return 'bg-amber-100 text-amber-900';
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
                            pedidos.map((pedido, index) => (
                                <tr key={pedido.id_venta || index} className="hover:bg-gray-50 transition-colors">
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
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(pedido.estado_pedido?.nombre_estado)}`}>
                                            {pedido.estado_pedido?.nombre_estado || 'Sin Estado'}
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

                                            {/* Quick Status Update - Dynamic from DB */}
                                            {(() => {
                                                // Debug log (only once per render/row if needed, but here it's inside map, be careful)
                                                // Better to log inside onChange
                                                return null;
                                            })()}
                                            <select
                                                value={pedido.id_estado || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    console.log("[PedidoGrid] Select changed. Value:", val, "Type:", typeof val);
                                                    console.log("[PedidoGrid] Estados available:", estados);
                                                    onUpdateStatus(pedido.id_venta!, Number(val));
                                                }}
                                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#742f37]"
                                            >
                                                {estados.map((estado, index) => (
                                                    <option key={estado.id_estado_pedido || index} value={estado.id_estado_pedido ?? ''}>
                                                        {estado.nombre_estado}
                                                    </option>
                                                ))}
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
