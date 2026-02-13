import { supabase } from '@/integrations/supabase/client';

/**
 * Upload a file to Supabase Storage
 * @param file - File to upload
 * @param path - Storage path (e.g., "free-ebook/my-file.pdf")
 * @returns Public URL of the uploaded file
 */
export async function uploadResourceFile(
    file: File,
    path: string
): Promise<{ url: string; error: Error | null }> {
    try {
        const { data, error } = await supabase.storage
            .from('resource-files')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('resource-files')
            .getPublicUrl(data.path);

        return { url: urlData.publicUrl, error: null };
    } catch (error) {
        console.error('Upload error:', error);
        return { url: '', error: error as Error };
    }
}

/**
 * Delete a file from Supabase Storage
 * @param path - Storage path to delete
 */
export async function deleteResourceFile(path: string): Promise<{ error: Error | null }> {
    try {
        const { error } = await supabase.storage
            .from('resource-files')
            .remove([path]);

        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Delete error:', error);
        return { error: error as Error };
    }
}

/**
 * Generate a signed URL for file download (valid for 60 seconds)
 * @param path - Storage path
 * @returns Signed URL
 */
export async function getDownloadUrl(
    path: string
): Promise<{ url: string; error: Error | null }> {
    try {
        const { data, error } = await supabase.storage
            .from('resource-files')
            .createSignedUrl(path, 60);

        if (error) throw error;
        return { url: data.signedUrl, error: null };
    } catch (error) {
        console.error('Download URL error:', error);
        return { url: '', error: error as Error };
    }
}

/**
 * Extract storage path from full URL
 * @param url - Full Supabase storage URL
 * @returns Storage path only
 */
export function extractStoragePath(url: string): string {
    // Example URL: https://xxx.supabase.co/storage/v1/object/public/resource-files/path/to/file.pdf
    const match = url.match(/resource-files\/(.+)$/);
    return match ? match[1] : '';
}
