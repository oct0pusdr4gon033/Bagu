import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash, Plus, Minus, ArrowLeft } from 'lucide-react';
import Button from '../../components/admin/Button';
import { Cliente } from '../../models/Cliente';
import { Producto } from '../../models/Producto';
import { VentaService } from '../../services/Venta.service';
import { supabase } from '../../lib/supabase';

export default function NuevoPedido() {
    const navigate = useNavigate();

    // Form States
    const [dniSearch, setDniSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [clientError, setClientError] = useState('');

    const [productSearch, setProductSearch] = useState('');
    const [searchResults, setSearchResults] = useState<Producto[]>([]);
    const [cart, setCart] = useState<{ product: Producto, quantity: number }[]>([]);

    const [shippingAddress, setShippingAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

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
            // Use existing service or simple query
            const { data } = await supabase
                .from('producto')
                .select('*')
                .ilike('nombre_producto', `%${productSearch}%`)
                .limit(5);

            if (data) setSearchResults(data);
        };

        const timeoutId = setTimeout(searchProducts, 300);
        return () => clearTimeout(timeoutId);
    }, [productSearch]);

    // Cart Actions
    const addToCart = (product: Producto) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id_producto === product.id_producto);
            if (existing) {
                return prev.map(item =>
                    item.product.id_producto === product.id_producto
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setProductSearch('');
        setSearchResults([]);
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id_producto === productId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id_producto !== productId));
    };

    const total = cart.reduce((sum, item) => sum + ((item.product.precio_base || 0) * item.quantity), 0);

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
                precio_unitario: item.product.precio_base || 0
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
        <div className="h-[calc(100vh-6rem)] flex flex-col">
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
                                    {searchResults.map(product => (
                                        <button
                                            key={product.id_producto}
                                            onClick={() => addToCart(product)}
                                            className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-50 flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{product.nombre_producto}</p>
                                                <p className="text-xs text-gray-500">${(product.precio_base || 0).toLocaleString()}</p>
                                            </div>
                                            <Plus className="w-4 h-4 text-[#742f37]" />
                                        </button>
                                    ))}
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
                            cart.map(item => (
                                <div key={item.product.id_producto} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.product.nombre_producto}</p>
                                        <p className="text-sm text-gray-500">${(item.product.precio_base || 0).toLocaleString()} x {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                                            <button onClick={() => updateQuantity(item.product.id_producto!, -1)} className="p-2 hover:bg-gray-50 rounded-l-lg text-gray-600"><Minus className="w-4 h-4" /></button>
                                            <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id_producto!, 1)} className="p-2 hover:bg-gray-50 rounded-r-lg text-gray-600"><Plus className="w-4 h-4" /></button>
                                        </div>
                                        <p className="font-bold text-[#742f37] w-24 text-right">${((item.product.precio_base || 0) * item.quantity).toLocaleString()}</p>
                                        <button onClick={() => removeFromCart(item.product.id_producto!)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            ))
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
