import { useState, useEffect } from 'react';
import { Cliente } from '../../../models/Cliente';

interface ClientFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (cliente: Partial<Cliente>) => void;
    initialClient?: Cliente;
}

export default function ClientFormModal({ isOpen, onClose, onSubmit, initialClient }: ClientFormModalProps) {
    const [formData, setFormData] = useState<Partial<Cliente>>({
        dni_cliente: '',
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
        departamento_cliente: '',
        ciudad_cliente: '',
        direccion_cliente: '',
        estado_cliente: true
    });

    useEffect(() => {
        if (initialClient) {
            setFormData(initialClient);
        } else {
            setFormData({
                dni_cliente: '',
                nombre_cliente: '',
                apellido_cliente: '',
                correo_cliente: '',
                telefono_cliente: '',
                departamento_cliente: '',
                ciudad_cliente: '',
                direccion_cliente: '',
                estado_cliente: true
            });
        }
    }, [initialClient, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {initialClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* DNI */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        DNI Cliente
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={!!initialClient}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37] disabled:bg-gray-100 disabled:text-gray-500"
                                        value={formData.dni_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, dni_cliente: e.target.value })}
                                        placeholder="Ingrese DNI"
                                    />
                                </div>

                                {/* Nombres */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombres Completos
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.nombre_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, nombre_cliente: e.target.value })}
                                        placeholder="Ingrese nombres"
                                    />
                                </div>


                                {/* Apellidos */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Apellidos Completos
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.apellido_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, apellido_cliente: e.target.value })}
                                        placeholder="Ingrese apellidos"
                                    />
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.telefono_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, telefono_cliente: e.target.value })}
                                        placeholder="Ingrese teléfono"
                                    />
                                </div>



                                {/* Correo */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.correo_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, correo_cliente: e.target.value })}
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>

                                {/* Departamento */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Departamento
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.departamento_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, departamento_cliente: e.target.value })}
                                        placeholder="Departamento"
                                    />
                                </div>

                                {/* Ciudad */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Distrito-Ciudad
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.ciudad_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, ciudad_cliente: e.target.value })}
                                        placeholder="Ciudad"
                                    />
                                </div>

                                {/* Dirección */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                        value={formData.direccion_cliente || ''}
                                        onChange={(e) => setFormData({ ...formData, direccion_cliente: e.target.value })}
                                        placeholder="Dirección exacta"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#742f37] text-base font-medium text-white hover:bg-[#5e262c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#742f37] sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                {initialClient ? 'Guardar Cambios' : 'Crear Cliente'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#742f37] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
