import { useState, useEffect } from 'react';
import { Colores } from '../../../models/Colores';
import Button from '../Button';

interface ColorFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (color: Partial<Colores>) => void;
    initialColor?: Colores;
}

export default function ColorFormModal({ isOpen, onClose, onSubmit, initialColor }: ColorFormModalProps) {
    const [nombre, setNombre] = useState('');
    const [codigoColor, setCodigoColor] = useState('#000000');

    useEffect(() => {
        if (initialColor) {
            setNombre(initialColor.nombre_color || '');
            setCodigoColor(initialColor.codigo_color || '#000000');
        } else {
            setNombre('');
            setCodigoColor('#000000');
        }
    }, [initialColor, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id_color: initialColor?.id_color,
            nombre_color: nombre,
            codigo_color: codigoColor
        });
        handleClose();
    };

    const handleClose = () => {
        setNombre('');
        setCodigoColor('#000000');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#742f37]">
                        {initialColor ? 'Editar Color' : 'Nuevo Color'}
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
                    {/* Nombre del Color */}
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre del Color
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="ej: Negro, Café, Vino Tinto"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Código de Color */}
                    <div>
                        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
                            Código de Color (Hex)
                        </label>
                        <div className="flex gap-3">
                            {/* Color Picker */}
                            <input
                                type="color"
                                value={codigoColor}
                                onChange={(e) => setCodigoColor(e.target.value)}
                                className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
                            />
                            {/* Hex Input */}
                            <input
                                type="text"
                                id="codigo"
                                value={codigoColor}
                                onChange={(e) => setCodigoColor(e.target.value)}
                                placeholder="#000000"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] focus:border-transparent font-mono"
                                pattern="^#[0-9A-Fa-f]{6}$"
                                required
                            />
                        </div>
                    </div>

                    {/* Vista Previa */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">Vista Previa:</p>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-16 h-16 rounded-lg border border-gray-300"
                                style={{ backgroundColor: codigoColor }}
                            />
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {nombre || 'Nombre del color'}
                                </p>
                                <p className="text-sm text-gray-500 font-mono">{codigoColor}</p>
                            </div>
                        </div>
                    </div>

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
                            {initialColor ? 'Actualizar Color' : 'Crear Color'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
