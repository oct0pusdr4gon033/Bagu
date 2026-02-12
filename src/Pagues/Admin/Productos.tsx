import { useState, useEffect, useMemo } from 'react';
import { Producto } from '../../models/Producto';
import { Categoria } from '../../models/Categoria';
import { ProductoService } from '../../services/Producto.service';
import { getCategorias } from '../../services/Categoria.service';
import ProductoHeaderSection from '../../sections/adm/Producto/ProductoHeaderSection';
import ProductoGridSection from '../../sections/adm/Producto/ProductoGridSection';
import ProductoModal from '../../sections/adm/Producto/ProductoModal';
// import { SupabaseStorageService } from '../../services/SupabaseStorage.service'; // Not directly used here, used in Service/Modal

export default function AdmProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Producto | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    // Initial Load
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [prods, cats] = await Promise.all([
                ProductoService.fetchProducts(),
                getCategorias()
            ]);
            setProductos(prods);
            setCategorias(cats);
        } catch (error) {
            console.error("Error loading data:", error);
            // Handle error toast
        } finally {
            setIsLoading(false);
        }
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return productos.filter(p => {
            const matchCat = selectedCategory ? p.id_categoria === selectedCategory : true;
            const matchMin = minPrice !== undefined ? p.precio_base >= minPrice : true;
            const matchMax = maxPrice !== undefined ? p.precio_base <= maxPrice : true;
            return matchCat && matchMin && matchMax;
        });
    }, [productos, selectedCategory, minPrice, maxPrice]);

    // Handlers
    const handleOpenModal = () => {
        setEditingProduct(undefined);
        setIsModalOpen(true);
    };

    const handleEditProduct = (producto: Producto) => {
        setEditingProduct(producto);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = async (producto: Producto) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${producto.nombre_producto}"?`)) {
            try {
                await ProductoService.deleteProduct(producto.id_producto!); // Assuming ID exists
                setProductos(prev => prev.filter(p => p.id_producto !== producto.id_producto));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error al eliminar el producto.");
            }
        }
    };

    const handleSaveProduct = async (productData: Partial<Producto>, images: File[], colorIds: number[]) => {
        try {
            setIsSaving(true);

            if (editingProduct?.id_producto) {
                // Update
                const updated = await ProductoService.updateFullProduct(
                    editingProduct.id_producto,
                    productData,
                    images,
                    colorIds
                );

                if (updated) {
                    setProductos(prev => prev.map(p => p.id_producto === updated.id_producto ? updated : p));
                    // Manually refresh list to get everything fresh (esp. category relations) if needed, 
                    // or ensuring the returned object has category populated would be better.
                    // For now, let's just re-fetch quickly or assume the user is okay with a partial update until visual refresh
                    loadData(); // Safer to reload to get relations like category name
                }
            } else {
                // Create
                const created = await ProductoService.createFullProduct(productData, images, colorIds);
                if (created) {
                    // setProductos(prev => [created, ...prev]); 
                    loadData(); // Reload to get relations
                }
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error al guardar el producto. Verifique la consola para más detalles.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductoHeaderSection
                onOpenModal={handleOpenModal}
                categorias={categorias}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
            />

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#742f37]"></div>
                </div>
            ) : (
                <ProductoGridSection
                    productos={filteredProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                />
            )}

            <ProductoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveProduct}
                initialProduct={editingProduct}
                isSaving={isSaving}
            />
        </div>
    );
}