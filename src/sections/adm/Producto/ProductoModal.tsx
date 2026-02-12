import { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { Producto } from '../../../models/Producto';
import { Categoria } from '../../../models/Categoria';
import { Colores } from '../../../models/Colores';
import { getCategorias } from '../../../services/Categoria.service';
import { getColores } from '../../../services/Colores.service';

interface ProductoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (producto: Partial<Producto>, images: File[], colorIds: number[]) => Promise<void>;
    initialProduct?: Producto;
    isSaving?: boolean;
}

export default function ProductoModal({ isOpen, onClose, onSubmit, initialProduct, isSaving = false }: ProductoModalProps) {
    const [formData, setFormData] = useState<Partial<Producto>>({
        nombre_producto: '',
        descripcion_producto: '',
        precio_base: 0,
        precio_oferta: 0,
        en_oferta: false,
        destacado: false,
        estado_producto: 'ACTIVO',
        id_categoria: undefined,
        imagen_url: ''
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [colores, setColores] = useState<Colores[]>([]);
    const [selectedColorIds, setSelectedColorIds] = useState<number[]>([]);

    // Image handling
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]); // For edit mode
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadDependencies();
            if (initialProduct) {
                setFormData(initialProduct);
                // Handle existing images - splitting by comma if stored that way or just single
                if (initialProduct.imagen_url) {
                    setExistingImages([initialProduct.imagen_url]);
                }
                // TODO: Load related colors if needed
            } else {
                resetForm();
            }
        }
    }, [isOpen, initialProduct]);

    const loadDependencies = async () => {
        try {
            const [cats, cols] = await Promise.all([getCategorias(), getColores()]);
            setCategorias(cats.filter(c => c.estado_categoria)); // Only active categories
            setColores(cols.filter(c => c.estado)); // Only active colors
        } catch (error) {
            console.error("Error loading dependencies:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            nombre_producto: '',
            descripcion_producto: '',
            precio_base: 0,
            precio_oferta: 0,
            en_oferta: false,
            destacado: false,
            estado_producto: 'ACTIVO',
            id_categoria: undefined,
            imagen_url: ''
        });
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImages([]);
        setSelectedColorIds([]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleColorToggle = (id: number) => {
        setSelectedColorIds(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...newFiles]);

            // Create previews
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            const urlToRevoke = prev[index];
            URL.revokeObjectURL(urlToRevoke);
            return prev.filter((_, i) => i !== index);
        });
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation
        if (!formData.nombre_producto || !formData.precio_base || !formData.id_categoria) {
            alert("Por favor complete los campos obligatorios (*)");
            return;
        }

        await onSubmit(formData, imageFiles, selectedColorIds);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-[#742f37]">
                            {initialProduct ? 'Editar Producto' : 'Nuevo Producto'}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-6 max-h-[80vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="col-span-1 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
                                <input
                                    type="text"
                                    name="nombre_producto"
                                    value={formData.nombre_producto}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                    placeholder="Nombre del producto"
                                />
                            </div>

                            {/* Category */}
                            <div className="col-span-1 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                                <select
                                    name="id_categoria"
                                    value={formData.id_categoria || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                >
                                    <option value="">Seleccionar Categoría</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id_categoria} value={cat.id_categoria}>
                                            {cat.nombre_categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                                <textarea
                                    name="descripcion_producto"
                                    value={formData.descripcion_producto}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                    placeholder="Descripción detallada del producto"
                                />
                            </div>

                            {/* Prices */}
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Base *</label>
                                <input
                                    type="number"
                                    name="precio_base"
                                    value={formData.precio_base}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio de Oferta</label>
                                <input
                                    type="number"
                                    name="precio_oferta"
                                    value={formData.precio_oferta || ''}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#742f37] focus:border-[#742f37]"
                                    placeholder="Opcional"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="col-span-1 md:col-span-2 flex space-x-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="en_oferta"
                                        checked={formData.en_oferta || false}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 text-[#742f37] focus:ring-[#742f37] border-gray-300 rounded"
                                    />
                                    <span className="text-gray-700 font-medium">Activar Oferta</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="destacado"
                                        checked={formData.destacado || false}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 text-[#742f37] focus:ring-[#742f37] border-gray-300 rounded"
                                    />
                                    <span className="text-gray-700 font-medium">Producto Destacado</span>
                                </label>
                            </div>

                            {/* Colors */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Colores Disponibles *</label>
                                <div className="flex flex-wrap gap-3">
                                    {colores.map(color => (
                                        <div
                                            key={color.id_color}
                                            onClick={() => color.id_color && handleColorToggle(color.id_color)}
                                            className={`
                                                flex items-center space-x-2 px-3 py-2 rounded-full cursor-pointer border transition-all
                                                ${selectedColorIds.includes(color.id_color!)
                                                    ? 'border-[#742f37] bg-red-50 ring-1 ring-[#742f37]'
                                                    : 'border-gray-200 hover:border-gray-300'}
                                            `}
                                        >
                                            <span
                                                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                                                style={{ backgroundColor: color.codigo_color }}
                                            />
                                            <span className="text-sm font-medium">{color.nombre_color}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Images */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes del Producto</label>

                                {/* Existing Images */}
                                {existingImages.length > 0 && (
                                    <div className="space-y-3 mb-4">
                                        {existingImages.map((url, idx) => (
                                            <div key={`existing-${idx}`} className="flex items-center space-x-4 p-2 border border-gray-200 rounded-md">
                                                <img src={url} alt="Preview" className="h-16 w-16 object-cover rounded" />
                                                <span className="flex-1 text-sm text-gray-500 truncate">{url}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(idx)}
                                                    className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-sm font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* New Image Previews */}
                                {imagePreviews.length > 0 && (
                                    <div className="space-y-3 mb-4">
                                        {imagePreviews.map((url, idx) => (
                                            <div key={`new-${idx}`} className="flex items-center space-x-4 p-2 border border-blue-100 bg-blue-50 rounded-md">
                                                <img src={url} alt="New Preview" className="h-16 w-16 object-cover rounded" />
                                                <span className="flex-1 text-sm text-blue-600 font-medium">Nueva Imagen</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(idx)}
                                                    className="px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-sm font-medium"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Image Button */}
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center text-[#742f37] font-semibold hover:text-red-800 transition-colors"
                                    >
                                        <Plus className="w-5 h-5 mr-1" />
                                        Agregar otra imagen
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Footer Actions */}
                        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSaving}
                                className="w-1/2 px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`w-1/2 px-4 py-3 border border-transparent rounded-md text-white bg-[#742f37] hover:bg-[#5a232b] font-medium transition-colors flex justify-center items-center shadow-md
                                    ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}
                                `}
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Guardando...
                                    </>
                                ) : (
                                    initialProduct ? 'Guardar Cambios' : 'Crear Producto'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
