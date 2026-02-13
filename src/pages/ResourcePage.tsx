import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResourcePage } from '@/hooks/useResources';
import { useState } from 'react';
import EmailGateModal from '@/components/EmailGateModal';

export default function ResourcePage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: page, isLoading, error } = useResourcePage(slug || '');
    const [selectedFile, setSelectedFile] = useState<{ id: string; name: string; url: string } | null>(null);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !page) {
        return <Navigate to="/" replace />;
    }

    const handleDownloadClick = (file: any) => {
        setSelectedFile({
            id: file.id,
            name: file.file_name,
            url: file.file_url,
        });
    };

    return (
        <>
            <div className="min-h-screen bg-background py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
                            {page.title}
                        </h1>
                        {page.description && (
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {page.description}
                            </p>
                        )}
                    </motion.div>

                    {/* Files Grid */}
                    <div className="space-y-4">
                        {page.files && page.files.length > 0 ? (
                            page.files.map((file, index) => (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-6 h-6 text-primary" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                                {file.file_name}
                                            </h3>
                                            {file.file_description && (
                                                <p className="text-muted-foreground mb-3">
                                                    {file.file_description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                {file.file_size && (
                                                    <span>{formatFileSize(file.file_size)}</span>
                                                )}
                                                {file.download_count > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{file.download_count} downloads</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => handleDownloadClick(file)}
                                            variant="glow"
                                            className="gap-2 flex-shrink-0"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                No files available yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Email Gate Modal */}
            {selectedFile && (
                <EmailGateModal
                    isOpen={!!selectedFile}
                    onClose={() => setSelectedFile(null)}
                    fileId={selectedFile.id}
                    fileName={selectedFile.name}
                    fileUrl={selectedFile.url}
                    pageId={page.id}
                />
            )}
        </>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
