import { useState, useMemo, useEffect } from 'react';
import { Cliente } from '../../models/Cliente';
import ClientHeaderSection from '../../sections/adm/Clientes/ClientHeaderSection';
import ClientTableSection from '../../sections/adm/Clientes/ClientTableSection';
import ClientFormModal from '../../sections/adm/Clientes/ClientFormModal';
import { getClientes, createCliente, updateCliente, toggleClienteStatus } from '../../services/Cliente.service';

export default function AdmClientes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Cliente | undefined>(undefined);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar clientes al iniciar
    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            setLoading(true);
            const data = await getClientes();
            setClientes(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando clientes:", err);
            setError("No se pudieron cargar los clientes. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Filtrar clientes según el estado seleccionado
    const filteredClientes = useMemo(() => {
        if (filter === 'active') {
            return clientes.filter(c => c.estado_cliente !== false);
        } else if (filter === 'inactive') {
            return clientes.filter(c => c.estado_cliente === false);
        }
        return clientes;
    }, [clientes, filter]);

    const handleOpenModal = () => {
        setEditingClient(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (cliente: Cliente) => {
        setEditingClient(cliente);
        setIsModalOpen(true);
    };

    const handleToggleActive = async (dni: string, currentStatus: boolean) => {
        try {
            const nuevoEstado = !currentStatus;
            await toggleClienteStatus(dni, nuevoEstado);

            // Actualizar estado local optimísticamente
            setClientes(clientes.map(c =>
                c.dni_cliente === dni
                    ? { ...c, estado_cliente: nuevoEstado }
                    : c
            ));
        } catch (err) {
            console.error("Error cambiando estado:", err);
            alert("Error al cambiar el estado del cliente");
        }
    };

    const handleSubmit = async (clientData: Partial<Cliente>) => {
        try {
            if (editingClient) {
                // Editar cliente existente
                // Asegurar que el objeto cumple con la interfaz Cliente
                const updatedClient = await updateCliente(clientData as Cliente);

                setClientes(clientes.map(c =>
                    c.dni_cliente === editingClient.dni_cliente
                        ? updatedClient
                        : c
                ));
            } else {
                // Crear nuevo cliente
                const newClient = await createCliente(clientData as Cliente);
                setClientes([...clientes, newClient]);
            }
            setIsModalOpen(false);
        } catch (err: any) {
            console.error("Error guardando cliente:", err);
            alert(err.message || "Error al guardar el cliente.");
        }
    };

    if (loading && clientes.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#742f37]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-600 bg-red-50 rounded-lg">
                <p>{error}</p>
                <button
                    onClick={loadClientes}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ClientHeaderSection
                onOpenModal={handleOpenModal}
                filter={filter}
                onFilterChange={setFilter}
            />

            <ClientTableSection
                clientes={filteredClientes}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
            />

            <ClientFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialClient={editingClient}
            />
        </div>
    );
}