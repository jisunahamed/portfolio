import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    useResourcePages,
    useCreateResourcePage,
    useUpdateResourcePage,
    useDeleteResourcePage,
} from '@/hooks/useResources';
import type { ResourcePage } from '@/lib/resourceTypes';

export default function ResourcePagesManager() {
    const { data: pages, isLoading } = useResourcePages();
    const createPage = useCreateResourcePage();
    const updatePage = useUpdateResourcePage();
    const deletePage = useDeleteResourcePage();

    const [isEditing, setIsEditing] = useState(false);
    const [editingPage, setEditingPage] = useState<ResourcePage | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setSlug('');
        setIsPublished(false);
        setEditingPage(null);
        setIsEditing(false);
    };

    const handleEdit = (page: ResourcePage) => {
        setEditingPage(page);
        setTitle(page.title);
        setDescription(page.description || '');
        setSlug(page.slug);
        setIsPublished(page.is_published);
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const pageData = {
            title,
            description: description || null,
            slug: slug || generateSlug(title),
            is_published: isPublished,
        };

        if (editingPage) {
            await updatePage.mutateAsync({
                id: editingPage.id,
                updates: pageData,
            });
        } else {
            await createPage.mutateAsync(pageData);
        }

        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this resource page? All files will also be deleted.')) {
            await deletePage.mutateAsync(id);
        }
    };

    const togglePublish = async (page: ResourcePage) => {
        await updatePage.mutateAsync({
            id: page.id,
            updates: { is_published: !page.is_published },
        });
    };

    if (isLoading) {
        return <div className="p-4 text-muted-foreground">Loading pages...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Resource Pages</h2>
                    <p className="text-sm text-muted-foreground">
                        Create pages for free downloadable resources
                    </p>
                </div>
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Page
                </Button>
            </div>

            {/* Create/Edit Form */}
            {isEditing && (
                <form
                    onSubmit={handleSubmit}
                    className="glass-card p-6 rounded-xl space-y-4 border border-primary/20"
                >
                    <h3 className="text-lg font-semibold">
                        {editingPage ? 'Edit Page' : 'Create New Page'}
                    </h3>

                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Free AI Automation Ebook"
                            className="w-full mt-1 px-4 py-2 bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Slug (URL Path)</label>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">/resources/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                placeholder="free-ebook"
                                className="flex-1 px-4 py-2 bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A comprehensive guide to building AI automation workflows..."
                            rows={3}
                            className="w-full mt-1 px-4 py-2 bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="published" className="text-sm font-medium">
                            Published (visible to public)
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={createPage.isPending || updatePage.isPending}>
                            {editingPage ? 'Update' : 'Create'} Page
                        </Button>
                        <Button type="button" variant="outline" onClick={resetForm}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            {/* Pages List */}
            <div className="space-y-3">
                {pages?.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No resource pages yet. Create one to get started!
                    </div>
                ) : (
                    pages?.map((page) => (
                        <div
                            key={page.id}
                            className="glass-card p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold">{page.title}</h3>
                                        {page.is_published ? (
                                            <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        /resources/{page.slug}
                                    </p>
                                    {page.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {page.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => togglePublish(page)}
                                        title={page.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        {page.is_published ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <EyeOff className="w-4 h-4" />
                                        )}
                                    </Button>

                                    {page.is_published && (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => window.open(`/resources/${page.slug}`, '_blank')}
                                            title="View Page"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    )}

                                    <Button size="sm" variant="ghost" onClick={() => handleEdit(page)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(page.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
