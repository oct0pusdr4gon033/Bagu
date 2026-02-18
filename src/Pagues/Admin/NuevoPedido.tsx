import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash, Plus, Minus, ArrowLeft, X } from 'lucide-react'; // Added X for modal
import Button from '../../components/admin/Button';
import { Cliente } from '../../models/Cliente';
import { Producto } from '../../models/Producto';
import { VentaService } from '../../services/Venta.service';
import { supabase } from '../../lib/supabase';

interface Color {
    id_color: number;
    nombre_color: string;
    codigo_color: string;
}

interface CartItem {
    product: Producto;
    quantity: number;
    color?: Color;
}

export default function NuevoPedido() {
    const navigate = useNavigate();

    // Form States
    const [dniSearch, setDniSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [clientError, setClientError] = useState('');

    const [productSearch, setProductSearch] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]); // product with colors
    const [cart, setCart] = useState<CartItem[]>([]);

    const [shippingAddress, setShippingAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Color Selection Modal State
    const [colorModalOpen, setColorModalOpen] = useState(false);
    const [productToSelect, setProductToSelect] = useState<any | null>(null);
    const [availableColors, setAvailableColors] = useState<Color[]>([]);

    // Search Client
    const handleSearchClient = async () => {
        if (!dniSearch.trim()) return;
        setClientError('');

        try {
            const { data, error } = await supabase
                .from('cliente')
                .select('*')
                .eq('dni_cliente', dniSearch)
                .single();

            if (error || !data) {
                setClientError('Cliente no encontrado');
                setSelectedClient(null);
            } else {
                setSelectedClient(data);
                setShippingAddress(data.direccion_cliente || '');
            }
        } catch (err) {
            setClientError('Error al buscar cliente');
        }
    };

    // Search Products
    useEffect(() => {
        const searchProducts = async () => {
            if (productSearch.length < 2) {
                setSearchResults([]);
                return;
            }
            // Fetch products AND their colors
            const { data } = await supabase
                .from('producto')
                .select(`
                    *,
                    producto_color (
                        color:id_color (*)
                    )
                `)
                .ilike('nombre_producto', `%${productSearch}%`)
                .limit(5);

            if (data) setSearchResults(data);
        };

        const timeoutId = setTimeout(searchProducts, 300);
        return () => clearTimeout(timeoutId);
    }, [productSearch]);

    // Cart Actions
    const initiateAddToCart = (product: any) => {
        const colors = product.producto_color?.map((pc: any) => pc.color) || [];
        if (colors.length > 0) {
            setProductToSelect(product);
            setAvailableColors(colors);
            setColorModalOpen(true);
        } else {
            addToCart(product, undefined);
        }
    };

    const addToCart = (product: Producto, color?: Color) => {
        setCart(prev => {
            // Check if same product AND same color exists
            const existing = prev.find(item =>
                item.product.id_producto === product.id_producto &&
                item.color?.id_color === color?.id_color
            );

            if (existing) {
                return prev.map(item =>
                    (item.product.id_producto === product.id_producto && item.color?.id_color === color?.id_color)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1, color }];
        });

        // Reset search and modal
        setProductSearch('');
        setSearchResults([]);
        setColorModalOpen(false);
        setProductToSelect(null);
    };

    const updateQuantity = (productId: number, colorId: number | undefined, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id_producto === productId && item.color?.id_color === colorId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (productId: number, colorId: number | undefined) => {
        setCart(prev => prev.filter(item => !(item.product.id_producto === productId && item.color?.id_color === colorId)));
    };

    // Helper to get effective price
    const getPrice = (product: Producto) => {
        if (product.en_oferta && product.precio_oferta) {
            return product.precio_oferta;
        }
        return product.precio_base || 0;
    };

    const total = cart.reduce((sum, item) => sum + (getPrice(item.product) * item.quantity), 0);

    // Create Order
    const handleSubmit = async () => {
        if (!selectedClient) {
            alert("Por favor seleccione un cliente");
            return;
        }
        if (cart.length === 0) {
            alert("Agregue al menos un producto");
            return;
        }

        setLoading(true);
        try {
            const ventaData = {
                id_comprador: selectedClient.dni_cliente,
                id_estado: 1, // 1 = Pendiente
                total_venta: total,
                direccion_envio: shippingAddress,
                notas: notes,
                fecha_venta: new Date()
            };

            const detallesData = cart.map(item => ({
                id_producto: item.product.id_producto,
                cantidad: item.quantity,
                precio_unitario: getPrice(item.product),
                id_color: item.color?.id_color
            }));

            await VentaService.create(ventaData, detallesData);
            navigate('/admin/pedidos');
        } catch (error) {
            console.error(error);
            alert("Error al crear el pedido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col relative">
            {/* Color Selection Modal */}
            {colorModalOpen && productToSelect && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-[#742f37]">Seleccionar Color</h3>
                            <button onClick={() => setColorModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <p className="mb-4 text-sm text-gray-600">Elige un color para <strong>{productToSelect.nombre_producto}</strong>:</p>
                        <div className="grid grid-cols-2 gap-3">
                            {availableColors.map(color => (
                                <button
                                    key={color.id_color}
                                    onClick={() => addToCart(productToSelect, color)}
                                    className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 hover:border-[#742f37] transition-colors"
                                >
                                    <span
                                        className="w-4 h-4 rounded-full border border-gray-200"
                                        style={{ backgroundColor: color.codigo_color }}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{color.nombre_color}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                <button
                    onClick={() => navigate('/admin/pedidos')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#742f37]">Crear Nuevo Pedido</h1>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
                {/* LEFT PANEL: Inputs */}
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2">

                    {/* 1. Client Selection */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold text-[#742f37] mb-4">1. Cliente</h2>
                        {!selectedClient ? (
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="DNI..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37]"
                                        value={dniSearch}
                                        onChange={(e) => setDniSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchClient()}
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                                <Button variant="primary" onClick={handleSearchClient}>Buscar</Button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start p-4 bg-[#742f37]/5 rounded-lg border border-[#742f37]/20">
                                <div>
                                    <p className="font-bold text-[#742f37]">{selectedClient.nombre_cliente} {selectedClient.apellido_cliente}</p>
                                    <p className="text-sm text-gray-600">{selectedClient.dni_cliente}</p>
                                </div>
                                <button onClick={() => { setSelectedClient(null); setDniSearch(''); }} className="text-xs text-red-600 underline mt-1">Cambiar</button>
                            </div>
                        )}
                        {clientError && <p className="text-red-500 mt-2 text-sm">{clientError}</p>}
                    </section>

                    {/* 2. Product Search */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-shrink-0 relative z-10">
                        <h2 className="text-xl font-bold text-[#742f37] mb-4">2. Agregar Productos</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37]"
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-60 overflow-y-auto">
                                    {searchResults.map(product => {
                                        const price = getPrice(product);
                                        const hasOffer = product.en_oferta && product.precio_oferta;

                                        return (
                                            <button
                                                key={product.id_producto}
                                                onClick={() => initiateAddToCart(product)}
                                                className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-50 flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.nombre_producto}</p>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        {hasOffer ? (
                                                            <>
                                                                <span className="text-gray-400 line-through">${(product.precio_base || 0).toLocaleString()}</span>
                                                                <span className="text-red-600 font-bold">${price.toLocaleString()}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-500">${price.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Plus className="w-4 h-4 text-[#742f37]" />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 3. Shipping & Notes */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold text-[#742f37] mb-4">3. Detalles</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37]"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#742f37] h-20 resize-none"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT PANEL: Order Items & Totals */}
                <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 className="text-xl font-bold text-[#742f37]">Detalle del Pedido</h2>
                        <span className="bg-[#742f37]/10 text-[#742f37] px-3 py-1 rounded-full text-sm font-medium">
                            {cart.reduce((a, b) => a + b.quantity, 0)} items
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Search className="w-12 h-12 mb-2 opacity-20" />
                                <p>No hay productos en el pedido</p>
                            </div>
                        ) : (
                            cart.map((item, index) => {
                                // Unique key using product id and color id (or index as fallback if no color)
                                const key = `${item.product.id_producto}-${item.color?.id_color || 'no-color'}`;
                                const price = getPrice(item.product);

                                return (
                                    <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.product.nombre_producto}</p>
                                            <div className="flex gap-2 items-center text-sm">
                                                <span className="text-gray-500">${price.toLocaleString()} x {item.quantity}</span>
                                                {item.color && (
                                                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color.codigo_color }}></span>
                                                        {item.color.nombre_color}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                                                <button onClick={() => updateQuantity(item.product.id_producto!, item.color?.id_color, -1)} className="p-2 hover:bg-gray-50 rounded-l-lg text-gray-600"><Minus className="w-4 h-4" /></button>
                                                <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id_producto!, item.color?.id_color, 1)} className="p-2 hover:bg-gray-50 rounded-r-lg text-gray-600"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <p className="font-bold text-[#742f37] w-24 text-right">${(price * item.quantity).toLocaleString()}</p>
                                            <button onClick={() => removeFromCart(item.product.id_producto!, item.color?.id_color)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl text-gray-600">Total a Pagar</span>
                            <span className="text-3xl font-bold text-[#742f37]">${total.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/admin/pedidos')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-white transition-colors">Cancelar</button>
                            <Button variant="primary" onClick={handleSubmit} disabled={loading || !selectedClient || cart.length === 0} className="flex-1 py-3 justify-center text-lg shadow-lg shadow-[#742f37]/20">
                                {loading ? 'Procesando...' : 'Confirmar Pedido'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
