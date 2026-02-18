import { supabase } from "../lib/supabase";
import { Producto } from "../models/Producto";
import { SupabaseStorageService } from "./SupabaseStorage.service";

export class ProductoService {
    static async fetchProducts(filters?: { categoria?: number, minPrice?: number, maxPrice?: number }): Promise<Producto[]> {
        let query = supabase
            .from('producto')
            .select(`
                *,
                *,
                categoria:id_categoria ( nombre_categoria ),
                imagenes:producto_imagen ( id_imagen, imagen_url )
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
                categoria:id_categoria ( nombre_categoria ),
                imagenes:producto_imagen ( id_imagen, imagen_url )
            `)
            .eq('id_producto', id)
            .single();

        if (error) {
            console.error("Error fetching product:", error);
            return null;
        }

        return data as Producto;
    }

    private static sanitizePayload(payload: Partial<Producto>): Partial<Producto> {
        const allowedFields = [
            'nombre_producto',
            'descripcion_producto',
            'precio_base',
            'imagen_url',
            'estado_producto',
            'id_categoria',
            'id_genero',
            'id_tamano',
            'precio_oferta',
            'en_oferta',
            'destacado'
        ];
        return Object.fromEntries(
            Object.entries(payload).filter(([k]) => allowedFields.includes(k))
        ) as Partial<Producto>;
    }

    // Comprehensive create function handling relations and images
    static async createFullProduct(
        producto: Partial<Producto>,
        images: File[],
        colorIds: number[],
        tamano?: { ancho: number; length: number }
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

            const dbPayload = this.sanitizePayload(producto);

            // 2. Insert Product
            const { data: newProduct, error: prodError } = await supabase
                .from('producto')
                .insert([dbPayload])
                .select()
                .single();

            if (prodError) throw prodError;
            if (!newProduct) throw new Error("Product creation failed");

            const productId = newProduct.id_producto;

            // 2.5 Insert Tamano if provided and link to product
            if (tamano && (tamano.ancho > 0 || tamano.length > 0)) {
                // Circular dependency handling: Product created -> Create Tamano with product_id -> Update Product with tamano_id
                const { data: newTamano, error: tamanoError } = await supabase
                    .from('tamano')
                    .insert([{
                        ancho: tamano.ancho,
                        largo: tamano.length,
                        id_producto: productId
                    }])
                    .select()
                    .single();

                if (tamanoError) {
                    console.error("Error creating tamano:", tamanoError);
                } else if (newTamano) {
                    // Update product with tamano id
                    await supabase
                        .from('producto')
                        .update({ id_tamano: newTamano.id_tamano })
                        .eq('id_producto', productId);
                }
            }


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
        colorIds: number[],
        tamano?: { id_tamano?: number, ancho: number; length: number }
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

            // Sanitize updates
            const dbUpdates = this.sanitizePayload(updates);

            // 2. Update Product
            const { data: updatedProduct, error: prodError } = await supabase
                .from('producto')
                .update(dbUpdates)
                .eq('id_producto', id)
                .select()
                .single();

            if (prodError) throw prodError;

            // 2.5 Update/Create Tamano
            if (tamano && (tamano.ancho > 0 || tamano.length > 0)) {
                if (tamano.id_tamano) {
                    // Update existing
                    await supabase
                        .from('tamano')
                        .update({ ancho: tamano.ancho, largo: tamano.length })
                        .eq('id_tamano', tamano.id_tamano);
                } else {
                    // Create new and link if product didn't have one
                    const { data: newTamano } = await supabase
                        .from('tamano')
                        .insert([{
                            ancho: tamano.ancho,
                            largo: tamano.length,
                            id_producto: id
                        }])
                        .select()
                        .single();

                    if (newTamano) {
                        await supabase.from('producto').update({ id_tamano: newTamano.id_tamano }).eq('id_producto', id);
                    }
                }
            }

            // 3. Update Colors (Delete all and re-insert is simplest strategy for now, or smart diff)
            // For simplicity: Delete all for this product and insert new set
            const { error: deleteColorError } = await supabase.from('producto_color').delete().eq('id_producto', id);
            if (deleteColorError) throw deleteColorError;

            if (colorIds.length > 0) {
                const colorInserts = colorIds.map(cid => ({
                    id_producto: id,
                    id_color: cid
                }));
                const { error: insertColorError } = await supabase.from('producto_color').insert(colorInserts);
                if (insertColorError) throw insertColorError;
            }

            // 4. Update Images (Add new ones)
            if (uploadedImageUrls.length > 0) {
                const imageInserts = uploadedImageUrls.map(url => ({
                    id_producto: id,
                    imagen_url: url
                }));
                const { error: insertImgError } = await supabase.from('producto_imagen').insert(imageInserts);
                if (insertImgError) throw insertImgError;
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

    static async deleteRelatedImage(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('producto_imagen')
            .delete()
            .eq('id_imagen', id);

        if (error) {
            console.error("Error deleting related image:", error);
            throw error;
        }

        return true;
    }

    static async uploadAndLinkImage(id_producto: number, file: File): Promise<{ id_imagen: number, id_producto: number, imagen_url: string } | null> {
        try {
            const url = await SupabaseStorageService.uploadImage(file);
            if (!url) return null;

            const { data, error } = await supabase
                .from('producto_imagen')
                .insert({
                    id_producto,
                    imagen_url: url
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Error linking new image:", error);
            throw error;
        }
    }
}
