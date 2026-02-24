import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CustomPage {
    id: string;
    title: string;
    slug: string;
    content: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Fetch all custom pages (admin list)
 */
export function useCustomPages() {
    return useQuery({
        queryKey: ['custom-pages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('custom_pages' as any)
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            return data as unknown as CustomPage[];
        },
    });
}

/**
 * Fetch a single published custom page by slug (public view)
 */
export function useCustomPage(slug: string) {
    return useQuery({
        queryKey: ['custom-page', slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('custom_pages' as any)
                .select('*')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (error) throw error;
            return data as unknown as CustomPage;
        },
        enabled: !!slug,
    });
}

/**
 * Create a new custom page
 */
export function useCreateCustomPage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (page: { title: string; slug: string; content: string; is_published: boolean }) => {
            const { data, error } = await supabase
                .from('custom_pages' as any)
                .insert(page as any)
                .select()
                .single();

            if (error) throw error;
            return data as unknown as CustomPage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['custom-pages'] });
        },
    });
}

/**
 * Update an existing custom page
 */
export function useUpdateCustomPage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updates }: { id: string; title?: string; slug?: string; content?: string; is_published?: boolean }) => {
            const { data, error } = await supabase
                .from('custom_pages' as any)
                .update(updates as any)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data as unknown as CustomPage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['custom-pages'] });
        },
    });
}

/**
 * Delete a custom page
 */
export function useDeleteCustomPage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('custom_pages' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['custom-pages'] });
        },
    });
}
