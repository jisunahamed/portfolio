import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, FileText, Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
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
            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Animated Background Elements - Hidden on mobile for performance */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="relative z-10 py-6 sm:py-12 md:py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        {/* Back to Home Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-6 sm:mb-8"
                        >
                            <Link to="/">
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Back to Portfolio</span>
                                    <span className="sm:hidden">Back</span>
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Header with Stagger Animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-8 sm:mb-12 md:mb-16"
                        >
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gradient px-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                {page.title}
                            </motion.h1>
                            {page.description && (
                                <motion.p
                                    className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    {page.description}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Files Grid with Enhanced Cards */}
                        <div className="space-y-4 sm:space-y-6">
                            {page.files && page.files.length > 0 ? (
                                page.files.map((file, index) => (
                                    <motion.div
                                        key={file.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                        className="glass-card group relative overflow-hidden"
                                    >
                                        {/* Card Glow Effect on Hover - Desktop only */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block" />

                                        <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-all">
                                            {/* Mobile Layout (Stack vertically) */}
                                            <div className="flex flex-col sm:hidden gap-4">
                                                {/* Icon + Title Row */}
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-bold mb-2 leading-tight">
                                                            {file.file_name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                {file.file_description && (
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {file.file_description}
                                                    </p>
                                                )}

                                                {/* Stats */}
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                                                    {file.file_size && (
                                                        <span className="flex items-center gap-1">
                                                            📦 {formatFileSize(file.file_size)}
                                                        </span>
                                                    )}
                                                    {file.download_count > 0 && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="flex items-center gap-1">
                                                                ⬇️ {file.download_count} downloads
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Download Button - Full Width on Mobile */}
                                                <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                        onClick={() => handleDownloadClick(file)}
                                                        variant="glow"
                                                        className="w-full gap-2"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download Free
                                                    </Button>
                                                </motion.div>
                                            </div>

                                            {/* Desktop Layout (Horizontal) */}
                                            <div className="hidden sm:flex items-start gap-4 md:gap-6">
                                                {/* Icon with Animation */}
                                                <motion.div
                                                    className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <FileText className="w-6 md:w-7 h-6 md:h-7 text-primary" />
                                                </motion.div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                                                        {file.file_name}
                                                    </h3>
                                                    {file.file_description && (
                                                        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                                                            {file.file_description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground flex-wrap">
                                                        {file.file_size && (
                                                            <span className="flex items-center gap-1">
                                                                📦 {formatFileSize(file.file_size)}
                                                            </span>
                                                        )}
                                                        {file.download_count > 0 && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="flex items-center gap-1">
                                                                    ⬇️ {file.download_count} downloads
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Download Button with Hover Animation */}
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        onClick={() => handleDownloadClick(file)}
                                                        variant="glow"
                                                        size="lg"
                                                        className="gap-2 flex-shrink-0 shadow-lg"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                        <span className="hidden lg:inline">Download Free</span>
                                                        <span className="lg:hidden">Download</span>
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 sm:py-16 md:py-20 text-muted-foreground"
                                >
                                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                                    <p className="text-base sm:text-lg">No files available yet.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced Footer */}
                <footer className="relative z-10 border-t border-border/50 mt-16 sm:mt-24 md:mt-32 bg-background/50 backdrop-blur-sm">
                    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16">
                        <div className="flex flex-col items-center gap-6 sm:gap-8">
                            {/* Social Media Links with Hover Effects */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <motion.a
                                    href="https://github.com/jisunahamed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted/40 hover:bg-primary/20 flex items-center justify-center transition-all group"
                                    aria-label="GitHub"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com/in/jisunahamed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted/40 hover:bg-primary/20 flex items-center justify-center transition-all group"
                                    aria-label="LinkedIn"
                                    whileHover={{ scale: 1.15, rotate: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com/jisunahamed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted/40 hover:bg-primary/20 flex items-center justify-center transition-all group"
                                    aria-label="Twitter"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </motion.a>
                            </div>

                            {/* Branding with Link */}
                            <div className="text-center">
                                <Link to="/" className="group inline-block">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center gap-2 mb-2 sm:mb-3"
                                    >
                                        <p className="text-muted-foreground font-mono text-sm sm:text-base md:text-lg group-hover:text-foreground transition-colors">
                                            &lt; <span className="text-primary font-bold group-hover:text-primary/80 transition-colors">jisun.online</span> /&gt;
                                        </p>
                                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                </Link>
                                <p className="text-xs sm:text-sm text-muted-foreground/70">
                                    © {new Date().getFullYear()} All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
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
