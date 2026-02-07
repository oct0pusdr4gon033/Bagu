import { Cliente } from '../../../models/Cliente';

interface ClientTableSectionProps {
    clientes: Cliente[];
    onEdit: (cliente: Cliente) => void;
    onToggleActive: (dni: string, currentStatus: boolean) => void;
}

export default function ClientTableSection({ clientes, onEdit, onToggleActive }: ClientTableSectionProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-auto h-[calc(100vh-280px)]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">DNI</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Cliente</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Teléfono</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Ubicación</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Estado</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {clientes.length > 0 ? (
                            clientes.map((cliente) => (
                                <tr key={cliente.dni_cliente} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {cliente.dni_cliente}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">
                                                {cliente.nombre_cliente} {cliente.apellido_cliente}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {cliente.correo_cliente}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {cliente.telefono_cliente}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex flex-col">
                                            <span>{cliente.ciudad_cliente}, {cliente.departamento_cliente}</span>
                                            <span className="text-xs text-gray-500">{cliente.direccion_cliente}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cliente.estado_cliente !== false
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {cliente.estado_cliente !== false ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(cliente)}
                                                className="p-2 text-gray-400 hover:text-[#742f37] hover:bg-[#742f37]/5 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    edit
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => onToggleActive(cliente.dni_cliente, cliente.estado_cliente ?? true)}
                                                className={`p-2 rounded-lg transition-colors ${cliente.estado_cliente !== false
                                                    ? 'text-red-400 hover:text-red-600 hover:bg-red-50'
                                                    : 'text-green-400 hover:text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={cliente.estado_cliente !== false ? "Desactivar" : "Activar"}
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {cliente.estado_cliente !== false ? 'delete' : 'restore_from_trash'}
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron clientes registrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
