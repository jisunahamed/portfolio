// Resource System Types

export interface ResourcePage {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export interface ResourceFile {
    id: string;
    page_id: string;
    file_name: string;
    file_description: string | null;
    file_url: string;
    file_size: number | null;
    file_type: string | null;
    download_count: number;
    created_at: string;
}

export interface ResourceDownload {
    id: string;
    page_id: string;
    file_id: string;
    email: string;
    downloaded_at: string;
}

// Extended types with relations
export interface ResourcePageWithFiles extends ResourcePage {
    files: ResourceFile[];
}

export interface ResourceDownloadWithDetails extends ResourceDownload {
    page_title?: string;
    file_name?: string;
}
