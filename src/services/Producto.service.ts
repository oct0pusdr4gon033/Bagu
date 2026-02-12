import { supabase } from "../lib/supabase";
import { Producto } from "../models/Producto";
import { SupabaseStorageService } from "./SupabaseStorage.service";

export class ProductoService {
    static async fetchProducts(filters?: { categoria?: number, minPrice?: number, maxPrice?: number }): Promise<Producto[]> {
        let query = supabase
            .from('producto')
            .select(`
                *,
                categoria:id_categoria ( nombre_categoria )
            `)
            .neq('estado_producto', 'INACTIVO') // Exclude inactive (soft deleted)
            .order('id_producto', { ascending: false }); // Order by ID instead of created_at

        if (filters?.categoria) {
            query = query.eq('id_categoria', filters.categoria);
        }
        if (filters?.minPrice) {
            query = query.gte('precio_base', filters.minPrice);
        }
        if (filters?.maxPrice) {
            query = query.lte('precio_base', filters.maxPrice);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching products:", error);
            throw error;
        }

        return data as Producto[];
    }

    static async fetchProductById(id: number): Promise<Producto | null> {
        const { data, error } = await supabase
            .from('producto')
            .select(`
                *,
                categoria:id_categoria ( nombre_categoria )
            `)
            .eq('id_producto', id)
            .single();

        if (error) {
            console.error("Error fetching product:", error);
            return null;
        }

        return data as Producto;
    }

    // Comprehensive create function handling relations and images
    static async createFullProduct(
        producto: Partial<Producto>,
        images: File[],
        colorIds: number[]
    ): Promise<Producto | null> {
        try {
            // 1. Upload images first to get URLs (or at least the main one)
            let mainImageUrl = producto.imagen_url || '';
            const uploadedImageUrls: string[] = [];

            for (const file of images) {
                const url = await SupabaseStorageService.uploadImage(file);
                if (url) {
                    uploadedImageUrls.push(url);
                    if (!mainImageUrl) mainImageUrl = url; // First image becomes main if none set
                }
            }

            producto.imagen_url = mainImageUrl; // Set main image for the product record

            // 2. Insert Product
            const { data: newProduct, error: prodError } = await supabase
                .from('producto')
                .insert([producto])
                .select()
                .single();

            if (prodError) throw prodError;
            if (!newProduct) throw new Error("Product creation failed");

            const productId = newProduct.id_producto;

            // 3. Insert Colors (producto_color)
            if (colorIds.length > 0) {
                const colorInserts = colorIds.map(id => ({
                    id_producto: productId,
                    id_color: id
                }));
                const { error: colorError } = await supabase
                    .from('producto_color')
                    .insert(colorInserts);

                if (colorError) console.error("Error linking colors:", colorError);
            }

            // 4. Insert Images (producto_imagen) - All uploaded images
            if (uploadedImageUrls.length > 0) {
                const imageInserts = uploadedImageUrls.map(url => ({
                    id_producto: productId,
                    imagen_url: url
                }));
                const { error: imgError } = await supabase
                    .from('producto_imagen')
                    .insert(imageInserts);

                if (imgError) console.error("Error linking images:", imgError);
            }

            return newProduct as Producto;

        } catch (error) {
            console.error("Error in createFullProduct:", error);
            throw error;
        }
    }

    static async updateFullProduct(
        id: number,
        updates: Partial<Producto>,
        newImages: File[],
        colorIds: number[]
    ): Promise<Producto | null> {
        try {
            // 1. Upload new images
            const uploadedImageUrls: string[] = [];
            for (const file of newImages) {
                const url = await SupabaseStorageService.uploadImage(file);
                if (url) uploadedImageUrls.push(url);
            }

            // If main image was removed or replaced, ensure updates.imagen_url is correct.
            // If new images added and no main image exists, use first new one.
            if (uploadedImageUrls.length > 0 && !updates.imagen_url) {
                updates.imagen_url = uploadedImageUrls[0];
            }

            // 2. Update Product
            const { data: updatedProduct, error: prodError } = await supabase
                .from('producto')
                .update(updates)
                .eq('id_producto', id)
                .select()
                .single();

            if (prodError) throw prodError;

            // 3. Update Colors (Delete all and re-insert is simplest strategy for now, or smart diff)
            // For simplicity: Delete all for this product and insert new set
            await supabase.from('producto_color').delete().eq('id_producto', id);

            if (colorIds.length > 0) {
                const colorInserts = colorIds.map(cid => ({
                    id_producto: id,
                    id_color: cid
                }));
                await supabase.from('producto_color').insert(colorInserts);
            }

            // 4. Update Images (Add new ones)
            if (uploadedImageUrls.length > 0) {
                const imageInserts = uploadedImageUrls.map(url => ({
                    id_producto: id,
                    imagen_url: url
                }));
                await supabase.from('producto_imagen').insert(imageInserts);
            }

            return updatedProduct as Producto;

        } catch (error) {
            console.error("Error in updateFullProduct:", error);
            throw error;
        }
    }

    static async deleteProduct(id: number): Promise<boolean> {
        // Soft delete
        const { error } = await supabase
            .from('producto')
            .update({ estado_producto: 'INACTIVO' })
            .eq('id_producto', id);

        if (error) {
            console.error("Error deleting product:", error);
            throw error;
        }

        return true;
    }
}
