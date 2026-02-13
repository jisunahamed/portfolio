import { useState } from 'react';
import { Upload, X, FileText, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateResourceFile, useDeleteResourceFile } from '@/hooks/useResources';
import { uploadResourceFile, deleteResourceFile, extractStoragePath } from '@/lib/supabaseStorage';
import type { ResourceFile } from '@/lib/resourceTypes';

interface Props {
    pageId: string;
    pageSlug: string;
    files: ResourceFile[];
}

export default function ResourceFileUploader({ pageId, pageSlug, files }: Props) {
    const createFile = useCreateResourceFile();
    const deleteFile = useDeleteResourceFile();

    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileDescription, setFileDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            // Upload to Supabase Storage
            const storagePath = `${pageSlug}/${Date.now()}_${selectedFile.name}`;
            const { url, error: uploadError } = await uploadResourceFile(selectedFile, storagePath);

            if (uploadError) throw uploadError;

            // Save to database
            await createFile.mutateAsync({
                page_id: pageId,
                file_name: fileName,
                file_description: fileDescription || null,
                file_url: url,
                file_size: selectedFile.size,
                file_type: selectedFile.type,
            });

            // Reset form
            setSelectedFile(null);
            setFileName('');
            setFileDescription('');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (file: ResourceFile) => {
        if (!confirm(`Delete "${file.file_name}"?`)) return;

        try {
            // Delete from storage
            const path = extractStoragePath(file.file_url);
            await deleteResourceFile(path);

            // Delete from database
            await deleteFile.mutateAsync(file.id);
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Delete failed. Please try again.');
        }
    };

    return (
        <div className="space-y-4">
            {/* Upload Form */}
            <div className="glass-card p-4 rounded-xl border border-primary/20">
                <h4 className="font-semibold mb-3">Upload New File</h4>

                <div className="space-y-3">
                    {/* File Input */}
                    <div>
                        <label className="relative block">
                            <input
                                type="file"
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="*/*"
                            />
                            <div className="px-4 py-3 bg-muted/40 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors flex items-center gap-2">
                                <Upload className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {selectedFile ? selectedFile.name : 'Choose file (max 50MB)'}
                                </span>
                            </div>
                        </label>
                    </div>

                    {selectedFile && (
                        <>
                            {/* File Name */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Display Name</label>
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="My Awesome Resource.pdf"
                                    className="w-full mt-1 px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">Description</label>
                                <textarea
                                    value={fileDescription}
                                    onChange={(e) => setFileDescription(e.target.value)}
                                    placeholder="Describe what's in this file..."
                                    rows={2}
                                    className="w-full mt-1 px-3 py-2 text-sm bg-muted/40 border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* Upload Button */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleUpload}
                                    disabled={isUploading || !fileName.trim()}
                                    size="sm"
                                    className="gap-2"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Upload File
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedFile(null);
                                        setFileName('');
                                        setFileDescription('');
                                    }}
                                    variant="outline"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Files List */}
            <div className="space-y-2">
                <h4 className="font-semibold text-sm">Uploaded Files ({files.length})</h4>

                {files.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                        No files uploaded yet
                    </div>
                ) : (
                    files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border/30"
                        >
                            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                            <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-sm">{file.file_name}</h5>
                                {file.file_description && (
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {file.file_description}
                                    </p>
                                )}
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span>{formatFileSize(file.file_size || 0)}</span>
                                    <span>•</span>
                                    <span>{file.download_count} downloads</span>
                                </div>
                            </div>

                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(file)}
                                className="text-destructive hover:text-destructive flex-shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
