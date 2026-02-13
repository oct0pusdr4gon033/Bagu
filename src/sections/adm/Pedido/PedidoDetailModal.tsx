import { X } from 'lucide-react';
import { Venta } from '../../../models/Venta';

interface PedidoDetailModalProps {
    pedido: Venta | null;
    onClose: () => void;
}

export default function PedidoDetailModal({ pedido, onClose }: PedidoDetailModalProps) {
    if (!pedido) return null;

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-[#742f37]">
                        Detalle del Pedido #{pedido.id_venta}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Customer Info */}
                    <div>
                        <h3 className="text-lg font-bold text-[#742f37] mb-4 border-b pb-2">
                            Información del Cliente
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-3">
                                <p><span className="font-semibold text-gray-700">Nombre:</span> {pedido.cliente?.nombre_cliente} {pedido.cliente?.apellido_cliente}</p>
                                <p><span className="font-semibold text-gray-700">Email:</span> {pedido.cliente?.correo_cliente || 'N/A'}</p>
                                <p><span className="font-semibold text-gray-700">Dirección:</span> {pedido.direccion_envio || pedido.cliente?.direccion_cliente || 'N/A'}</p>
                            </div>
                            <div className="space-y-3">
                                <p><span className="font-semibold text-gray-700">Teléfono:</span> {pedido.cliente?.telefono_cliente || 'N/A'}</p>
                                <p><span className="font-semibold text-gray-700">Ciudad:</span> {pedido.cliente?.ciudad_cliente || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Products List */}
                    <div>
                        <h3 className="text-lg font-bold text-[#742f37] mb-4 border-b pb-2">
                            Productos
                        </h3>
                        <div className="space-y-3">
                            {pedido.detalles?.map((detalle, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {detalle.producto?.nombre_producto || 'Producto no encontrado'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {detalle.cantidad}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#742f37] text-lg">
                                            ${(detalle.cantidad * detalle.precio_unitario).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ${detalle.precio_unitario.toLocaleString()} c/u
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Totals */}
                    <div className="bg-[#742f37]/5 p-6 rounded-xl border border-[#742f37]/10 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-700">Fecha:</span>
                            <span>{pedido.fecha_venta ? new Date(pedido.fecha_venta).toLocaleString() : '-'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-700">Estado:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(pedido.tipo_pedido?.nombre_tipo)}`}>
                                {pedido.tipo_pedido?.nombre_tipo || 'Desconocido'}
                            </span>
                        </div>
                        {pedido.notas && (
                            <div className="pt-2 border-t border-gray-200">
                                <p className="font-semibold text-gray-700 text-sm mb-1">Notas:</p>
                                <p className="text-sm text-gray-600 italic">{pedido.notas}</p>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <span className="text-xl font-bold text-[#742f37]">Total:</span>
                            <span className="text-2xl font-bold text-[#742f37]">
                                ${pedido.total_venta?.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
