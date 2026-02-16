import { useState } from 'react';
import { Download, Search, Trash2, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResourceDownloads, useResourcePages, useDeleteResourceDownload } from '@/hooks/useResources';
import { AnimatePresence, motion } from 'framer-motion';

export default function DownloadsDashboard() {
    const { data: pages } = useResourcePages();
    const [selectedPageId, setSelectedPageId] = useState<string>('');
    const { data: downloads, isLoading } = useResourceDownloads(selectedPageId || undefined);
    const deleteDownload = useDeleteResourceDownload();
    const [searchQuery, setSearchQuery] = useState('');
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const filteredDownloads = downloads?.filter((d) =>
        d.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const exportToCSV = () => {
        if (!downloads || downloads.length === 0) return;

        const csvData = [
            ['Email', 'Page', 'File', 'Downloaded At'],
            ...downloads.map((d) => [
                d.email,
                d.page?.title || 'N/A',
                d.file?.file_name || 'N/A',
                new Date(d.downloaded_at).toLocaleString(),
            ]),
        ];

        const csvContent = csvData.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resource-downloads-${Date.now()}.csv`;
        link.click();
    };

    const handleDelete = async () => {
        if (itemToDelete) {
            try {
                await deleteDownload.mutateAsync(itemToDelete);
                setItemToDelete(null);
            } catch (error) {
                console.error("Failed to delete download record:", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Email Submissions</h2>
                    <p className="text-sm text-muted-foreground">
                        {downloads?.length || 0} total downloads tracked
                    </p>
                </div>
                <Button onClick={exportToCSV} className="gap-2" disabled={!downloads?.length}>
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 rounded-xl border border-border/50 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                    {/* Page Filter */}
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Filter by Page
                        </label>
                        <select
                            value={selectedPageId}
                            onChange={(e) => setSelectedPageId(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                        >
                            <option value="">All Pages</option>
                            {pages?.map((page) => (
                                <option key={page.id} value={page.id}>
                                    {page.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email Search */}
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            Search Email
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="user@example.com"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Downloads List */}
            <div className="space-y-2">
                {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading...</div>
                ) : filteredDownloads?.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No downloads found
                    </div>
                ) : (
                    filteredDownloads?.map((download) => (
                        <div
                            key={download.id}
                            className="glass-card p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{download.email}</p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        <span className="font-medium text-primary">
                                            {download.page?.title || 'N/A'}
                                        </span>
                                        <span>•</span>
                                        <span className="truncate">{download.file?.file_name || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatRelativeTime(download.downloaded_at)}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => setItemToDelete(download.id)}
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
                {itemToDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setItemToDelete(null)}
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
                                        <h3 className="text-lg font-bold">Delete Record?</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Are you sure you want to delete this download record? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="ghost" onClick={() => setItemToDelete(null)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={deleteDownload.isPending}
                                    >
                                        {deleteDownload.isPending ? 'Deleting...' : 'Delete'}
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

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
