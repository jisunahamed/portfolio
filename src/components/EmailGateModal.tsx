import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Download, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useTrackDownload } from '@/hooks/useResources';
import { getDownloadUrl } from '@/lib/supabaseStorage';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    fileId: string;
    fileName: string;
    fileUrl: string;
    pageId: string;
}

export default function EmailGateModal({
    isOpen,
    onClose,
    fileId,
    fileName,
    fileUrl,
    pageId,
}: Props) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const trackDownload = useTrackDownload();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            console.log('📧 Tracking download for:', { pageId, fileId, email });

            // Track download in database
            await trackDownload.mutateAsync({
                pageId,
                fileId,
                email,
            });

            console.log('✅ Download tracked successfully');

            // Get download URL - extract path from full URL
            console.log('🔗 File URL:', fileUrl);

            // Extract the storage path from the URL
            // URL format: https://xxx.supabase.co/storage/v1/object/public/resource-files/path/to/file.pdf
            const urlParts = fileUrl.split('/resource-files/');
            const path = urlParts.length > 1 ? urlParts[1] : '';

            console.log('📂 Extracted path:', path);

            if (!path) {
                throw new Error('Failed to extract file path from URL');
            }

            const { url: signedUrl, error } = await getDownloadUrl(path);

            console.log('🔐 Signed URL generated:', { signedUrl, error });

            if (error || !signedUrl) {
                console.error('❌ Signed URL error:', error);
                throw new Error(error?.message || 'Failed to generate download link');
            }

            // Auto download
            console.log('⬇️ Starting download...');
            const link = document.createElement('a');
            link.href = signedUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('✅ Download initiated');

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setEmail('');
                setIsSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('❌ Download error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Download failed: ${errorMessage}\n\nPlease check the browser console for details.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card p-6 sm:p-8 rounded-2xl border border-border/50 max-w-md w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {isSuccess ? (
                                /* Success State */
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-2">Download Started!</h3>
                                    <p className="text-muted-foreground">
                                        Your file is downloading now.
                                    </p>
                                </div>
                            ) : (
                                /* Form */
                                <>
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <Download className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Get Your Free Resource</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Enter your email to download <strong>{fileName}</strong>
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="your@email.com"
                                                    className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="glow"
                                            className="w-full gap-2"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-4 h-4" />
                                                    Download Now
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            ✓ No spam, only value • ✓ Instant download
                                        </p>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
