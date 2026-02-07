import { useState, useEffect } from 'react';
import { Categoria } from '../../../models/Categoria';
import Button from '../../../components/admin/Button';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (categoria: Partial<Categoria>) => void;
    initialCategory?: Categoria;
}

export default function CategoryFormModal({ isOpen, onClose, onSubmit, initialCategory }: CategoryFormModalProps) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [urlImagen, setUrlImagen] = useState('');

    useEffect(() => {
        if (initialCategory) {
            setNombre(initialCategory.nombre_categoria || '');
            setDescripcion(initialCategory.descripcion_categoria || '');
            setUrlImagen(initialCategory.url_categoria || '');
        } else {
            setNombre('');
            setDescripcion('');
            setUrlImagen('');
        }
    }, [initialCategory, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id_categoria: initialCategory?.id_categoria,
            nombre_categoria: nombre,
            descripcion_categoria: descripcion,
            url_categoria: urlImagen
        });
        handleClose();
    };

    const handleClose = () => {
        setNombre('');
        setDescripcion('');
        setUrlImagen('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#742f37]">
                        {initialCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la Categoría
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="ej: Carteras, Mochilas"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Descripción de la categoría"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] focus:border-transparent resize-none"
                        />
                    </div>

                    {/* URL Imagen */}
                    <div>
                        <label htmlFor="urlImagen" className="block text-sm font-medium text-gray-700 mb-2">
                            URL de la Imagen
                        </label>
                        <input
                            type="text"
                            id="urlImagen"
                            value={urlImagen}
                            onChange={(e) => setUrlImagen(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] focus:border-transparent"
                        />
                    </div>

                    {/* Vista Previa Imagen (Opcional) */}
                    {urlImagen && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex gap-4 items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                    src={urlImagen}
                                    alt="Vista previa"
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                                />
                            </div>
                            <p className="text-sm text-gray-500">Vista previa de la imagen</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                        >
                            {initialCategory ? 'Actualizar Categoría' : 'Crear Categoría'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
