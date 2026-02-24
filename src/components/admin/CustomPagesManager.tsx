import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Eye, EyeOff, ExternalLink, Copy, Check, AlertTriangle, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    useCustomPages,
    useCreateCustomPage,
    useUpdateCustomPage,
    useDeleteCustomPage,
    CustomPage,
} from '@/hooks/useCustomPages';
import { useToast } from '@/hooks/use-toast';

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function CustomPagesManager() {
    const { data: pages, isLoading } = useCustomPages();
    const createPage = useCreateCustomPage();
    const updatePage = useUpdateCustomPage();
    const deletePage = useDeleteCustomPage();
    const { toast } = useToast();

    const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setContent('');
        setIsPublished(false);
        setSlugManuallyEdited(false);
        setEditingPage(null);
        setIsCreating(false);
    };

    const openCreate = () => {
        resetForm();
        setIsCreating(true);
    };

    const openEdit = (page: CustomPage) => {
        setTitle(page.title);
        setSlug(page.slug);
        setContent(page.content);
        setIsPublished(page.is_published);
        setSlugManuallyEdited(true);
        setEditingPage(page);
        setIsCreating(true);
    };

    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!slugManuallyEdited) {
            setSlug(slugify(val));
        }
    };

    const handleSlugChange = (val: string) => {
        setSlugManuallyEdited(true);
        setSlug(slugify(val));
    };

    const handleSave = async () => {
        if (!title.trim() || !slug.trim()) {
            toast({ title: 'Error', description: 'Title and slug are required.', variant: 'destructive' });
            return;
        }

        try {
            if (editingPage) {
                await updatePage.mutateAsync({
                    id: editingPage.id,
                    title: title.trim(),
                    slug: slug.trim(),
                    content,
                    is_published: isPublished,
                });
                toast({ title: 'Page Updated', description: 'Custom page has been updated.' });
            } else {
                await createPage.mutateAsync({
                    title: title.trim(),
                    slug: slug.trim(),
                    content,
                    is_published: isPublished,
                });
                toast({ title: 'Page Created', description: 'Custom page has been created.' });
            }
            resetForm();
        } catch (err: any) {
            toast({ title: 'Error', description: err.message || 'Failed to save page.', variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deletePage.mutateAsync(deleteId);
            toast({ title: 'Deleted', description: 'Page has been deleted.' });
            setDeleteId(null);
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' });
        }
    };

    const handleTogglePublish = async (page: CustomPage) => {
        try {
            await updatePage.mutateAsync({ id: page.id, is_published: !page.is_published });
            toast({
                title: page.is_published ? 'Unpublished' : 'Published',
                description: `Page "${page.title}" is now ${page.is_published ? 'hidden' : 'live'}.`,
            });
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' });
        }
    };

    const copyLink = (pageSlug: string) => {
        const url = `${window.location.origin}/p/${pageSlug}`;
        navigator.clipboard.writeText(url);
        setCopiedId(pageSlug);
        setTimeout(() => setCopiedId(null), 2000);
        toast({ title: 'Link Copied!', description: url });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Custom Pages</h2>
                    <p className="text-sm text-muted-foreground">
                        Standalone pages accessible only via direct URL
                    </p>
                </div>
                {!isCreating && (
                    <Button onClick={openCreate} className="gap-2">
                        <Plus className="w-4 h-4" />
                        New Page
                    </Button>
                )}
            </div>

            {/* Create / Edit Form */}
            <AnimatePresence>
                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-card p-6 rounded-xl border border-border/50 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">
                                    {editingPage ? 'Edit Page' : 'Create New Page'}
                                </h3>
                                <Button variant="ghost" size="icon" onClick={resetForm}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                        Page Title *
                                    </label>
                                    <Input
                                        value={title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="My Documentation"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                        URL Slug *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                            /p/
                                        </span>
                                        <Input
                                            value={slug}
                                            onChange={(e) => handleSlugChange(e.target.value)}
                                            placeholder="my-documentation"
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                    Content (Markdown supported)
                                </label>
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="# My Page Title&#10;&#10;Write your content here using **markdown**..."
                                    rows={16}
                                    className="font-mono text-sm"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isPublished}
                                        onChange={(e) => setIsPublished(e.target.checked)}
                                        className="rounded border-border"
                                    />
                                    <span className="text-sm">Publish immediately</span>
                                </label>

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={createPage.isPending || updatePage.isPending}
                                    >
                                        {(createPage.isPending || updatePage.isPending)
                                            ? 'Saving...'
                                            : editingPage
                                                ? 'Update Page'
                                                : 'Create Page'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pages List */}
            <div className="space-y-2">
                {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading...</div>
                ) : !pages?.length ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No custom pages yet</p>
                        <p className="text-xs mt-1">Create your first page to get started</p>
                    </div>
                ) : (
                    pages.map((page) => (
                        <div
                            key={page.id}
                            className="glass-card p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm truncate">{page.title}</p>
                                        <span
                                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${page.is_published
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                                }`}
                                        >
                                            {page.is_published ? 'Live' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        /p/{page.slug}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => copyLink(page.slug)}
                                        title="Copy link"
                                    >
                                        {copiedId === page.slug ? (
                                            <Check className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </Button>
                                    {page.is_published && (
                                        <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Open page">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </a>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleTogglePublish(page)}
                                        title={page.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        {page.is_published ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => openEdit(page)}
                                        title="Edit"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                        onClick={() => setDeleteId(page.id)}
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDeleteId(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">Delete Page?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            This action cannot be undone. The page and its content will be permanently deleted.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" onClick={() => setDeleteId(null)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={deletePage.isPending}
                                    >
                                        {deletePage.isPending ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
