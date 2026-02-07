import { useState, useMemo, useEffect } from 'react';
import { Colores } from '../../models/Colores';
import ColorHeaderSection from '../../sections/adm/Colores/ColorHeaderSection';
import ColorGridSection from '../../sections/adm/Colores/ColorGridSection';
import ColorFormModal from '../../sections/adm/Colores/ColorFormModal';
import { getColores, createColor, updateColor, toggleColorStatus } from '../../services/Colores.service';

export default function AdmColores() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<Colores | undefined>(undefined);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [colores, setColores] = useState<Colores[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar colores al iniciar
    useEffect(() => {
        loadColores();
    }, []);

    const loadColores = async () => {
        try {
            setLoading(true);
            const data = await getColores();
            setColores(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando colores:", err);
            setError("No se pudieron cargar los colores. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Filtrar colores según el estado seleccionado
    const filteredColores = useMemo(() => {
        if (filter === 'active') {
            return colores.filter(c => c.estado !== false);
        } else if (filter === 'inactive') {
            return colores.filter(c => c.estado === false);
        }
        return colores; // 'all'
    }, [colores, filter]);

    const handleOpenModal = () => {
        setEditingColor(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (color: Colores) => {
        setEditingColor(color);
        setIsModalOpen(true);
    };

    const handleToggleActive = async (id: number, currentStatus: boolean) => {
        try {
            const nuevoEstado = !currentStatus;
            await toggleColorStatus(id, nuevoEstado);

            // Actualizar estado local optimísticamente
            setColores(colores.map(c =>
                c.id_color === id
                    ? { ...c, estado: nuevoEstado }
                    : c
            ));
        } catch (err) {
            console.error("Error cambiando estado:", err);
            alert("Error al cambiar el estado del color");
        }
    };

    const handleSubmit = async (colorData: Partial<Colores>) => {
        try {
            if (editingColor && editingColor.id_color) {
                // Editar color existente
                const updatedColor = await updateColor({
                    ...colorData,
                    id_color: editingColor.id_color
                });

                setColores(colores.map(c =>
                    c.id_color === editingColor.id_color
                        ? updatedColor
                        : c
                ));
            } else {
                // Crear nuevo color
                const newColor = await createColor(colorData);
                setColores([...colores, newColor]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error guardando color:", err);
            alert("Error al guardar el color. Verifica que los datos sean correctos.");
        }
    };

    if (loading && colores.length === 0) {
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
                    onClick={loadColores}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <ColorHeaderSection
                onOpenModal={handleOpenModal}
                filter={filter}
                onFilterChange={setFilter}
            />

            <ColorGridSection
                colores={filteredColores}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
            />

            <ColorFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialColor={editingColor}
            />
        </div>
    );
}