import { supabase } from "../lib/supabase";

export class SupabaseStorageService {
    private static BUCKET_NAME = 'Productos';

    static async uploadImage(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(this.BUCKET_NAME)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from(this.BUCKET_NAME)
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    }

    static async deleteImage(imageUrl: string): Promise<boolean> {
        try {
            const path = imageUrl.split(`${this.BUCKET_NAME}/`).pop();
            if (!path) return false;

            const { error } = await supabase.storage
                .from(this.BUCKET_NAME)
                .remove([path]);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error("Error deleting image:", error);
            return false;
        }
    }
}
