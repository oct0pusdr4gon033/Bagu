import { useState, useMemo, useEffect } from 'react';
import { Categoria } from '../../models/Categoria';
import CategoryHeaderSection from '../../sections/adm/Categorias/CategoryHeaderSection';
import CategoryGridSection from '../../sections/adm/Categorias/CategoryGridSection';
import CategoryFormModal from '../../sections/adm/Categorias/CategoryFormModal';
import { getCategorias, createCategoria, updateCategoria, toggleCategoriaStatus } from '../../services/Categoria.service';

export default function AdmCategorias() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Categoria | undefined>(undefined);
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar categorías al iniciar
    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            setLoading(true);
            const data = await getCategorias();
            setCategorias(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando categorías:", err);
            setError("No se pudieron cargar las categorías. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Filtrar categorías según el estado seleccionado
    const filteredCategorias = useMemo(() => {
        if (filter === 'active') {
            return categorias.filter(c => c.estado_categoria !== false);
        } else if (filter === 'inactive') {
            return categorias.filter(c => c.estado_categoria === false);
        }
        return categorias;
    }, [categorias, filter]);

    const handleOpenModal = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (categoria: Categoria) => {
        setEditingCategory(categoria);
        setIsModalOpen(true);
    };

    const handleToggleActive = async (id: number, currentStatus: boolean) => {
        try {
            const nuevoEstado = !currentStatus;
            await toggleCategoriaStatus(id, nuevoEstado);

            // Actualizar estado local optimísticamente
            setCategorias(categorias.map(c =>
                c.id_categoria === id
                    ? { ...c, estado_categoria: nuevoEstado }
                    : c
            ));
        } catch (err) {
            console.error("Error cambiando estado:", err);
            alert("Error al cambiar el estado de la categoría");
        }
    };

    const handleSubmit = async (categoryData: Partial<Categoria>) => {
        try {
            if (editingCategory && editingCategory.id_categoria) {
                // Editar categoría existente
                const updatedCategory = await updateCategoria({
                    ...categoryData,
                    id_categoria: editingCategory.id_categoria
                });

                setCategorias(categorias.map(c =>
                    c.id_categoria === editingCategory.id_categoria
                        ? updatedCategory
                        : c
                ));
            } else {
                // Crear nueva categoría
                const newCategory = await createCategoria(categoryData);
                setCategorias([...categorias, newCategory]);
            }
            setIsModalOpen(false);
        } catch (err: any) {
            console.error("Detailed Error saving category:", err);
            if (err.code) console.error("Error Code:", err.code);
            if (err.details) console.error("Error Details:", err.details);
            if (err.hint) console.error("Error Hint:", err.hint);
            alert(err.message || "Error al guardar la categoría.");
        }
    };

    if (loading && categorias.length === 0) {
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
                    onClick={loadCategorias}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoryHeaderSection
                onOpenModal={handleOpenModal}
                filter={filter}
                onFilterChange={setFilter}
            />

            <CategoryGridSection
                categorias={filteredCategorias}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
            />

            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialCategory={editingCategory}
            />
        </div>
    );
}
