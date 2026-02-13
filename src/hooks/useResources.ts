import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ResourcePage, ResourceFile, ResourcePageWithFiles } from '@/lib/resourceTypes';

/**
 * Fetch all resource pages (admin view)
 */
export function useResourcePages() {
    return useQuery({
        queryKey: ['resource-pages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('resource_pages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as ResourcePage[];
        },
    });
}

/**
 * Fetch a single resource page with its files (public view)
 */
export function useResourcePage(slug: string) {
    return useQuery({
        queryKey: ['resource-page', slug],
        queryFn: async () => {
            const { data: page, error: pageError } = await supabase
                .from('resource_pages')
                .select('*, files:resource_files(*)')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (pageError) throw pageError;
            return page as ResourcePageWithFiles;
        },
        enabled: !!slug,
    });
}

/**
 * Create a new resource page
 */
export function useCreateResourcePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (page: Omit<ResourcePage, 'id' | 'created_at' | 'updated_at'>) => {
            const { data, error } = await supabase
                .from('resource_pages')
                .insert(page)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resource-pages'] });
        },
    });
}

/**
 * Update a resource page
 */
export function useUpdateResourcePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<ResourcePage> }) => {
            const { data, error } = await supabase
                .from('resource_pages')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resource-pages'] });
        },
    });
}

/**
 * Delete a resource page
 */
export function useDeleteResourcePage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('resource_pages')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resource-pages'] });
        },
    });
}

/**
 * Add a file to a resource page
 */
export function useCreateResourceFile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: Omit<ResourceFile, 'id' | 'download_count' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('resource_files')
                .insert(file)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resource-pages'] });
        },
    });
}

/**
 * Delete a resource file
 */
export function useDeleteResourceFile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('resource_files')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resource-pages'] });
        },
    });
}

/**
 * Track a download (insert email record)
 */
export function useTrackDownload() {
    return useMutation({
        mutationFn: async ({
            pageId,
            fileId,
            email,
        }: {
            pageId: string;
            fileId: string;
            email: string;
        }) => {
            const { error } = await supabase
                .from('resource_downloads')
                .insert({
                    page_id: pageId,
                    file_id: fileId,
                    email,
                });

            if (error) throw error;
        },
    });
}

/**
 * Fetch all download records (admin view)
 */
export function useResourceDownloads(pageId?: string) {
    return useQuery({
        queryKey: ['resource-downloads', pageId],
        queryFn: async () => {
            let query = supabase
                .from('resource_downloads')
                .select(`
          *,
          page:resource_pages(title),
          file:resource_files(file_name)
        `)
                .order('downloaded_at', { ascending: false });

            if (pageId) {
                query = query.eq('page_id', pageId);
            }

            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
    });
}
