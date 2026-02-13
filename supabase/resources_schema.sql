-- Free Resources System Schema
-- Run this migration to set up the resources download system
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 1. Resource Pages Table
CREATE TABLE IF NOT EXISTS resource_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 2. Resource Files Table
CREATE TABLE IF NOT EXISTS resource_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES resource_pages(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_description TEXT,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_type TEXT,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 3. Resource Downloads Table (Email tracking)
CREATE TABLE IF NOT EXISTS resource_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES resource_pages(id) ON DELETE CASCADE,
    file_id UUID REFERENCES resource_files(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resource_files_page_id ON resource_files(page_id);
CREATE INDEX IF NOT EXISTS idx_downloads_email ON resource_downloads(email);
CREATE INDEX IF NOT EXISTS idx_downloads_page ON resource_downloads(page_id);
CREATE INDEX IF NOT EXISTS idx_downloads_file ON resource_downloads(file_id);
-- Enable Row Level Security
ALTER TABLE resource_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
-- RLS Policies for resource_pages
-- Public can view published pages
CREATE POLICY "Anyone can view published resource pages" ON resource_pages FOR
SELECT USING (is_published = true);
-- Admin can do everything (replace with your admin email)
CREATE POLICY "Admin full access to resource pages" ON resource_pages FOR ALL USING (
    auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
);
-- RLS Policies for resource_files
-- Public can view files of published pages
CREATE POLICY "Anyone can view files of published pages" ON resource_files FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM resource_pages
            WHERE id = resource_files.page_id
                AND is_published = true
        )
    );
-- Admin can manage all files
CREATE POLICY "Admin full access to resource files" ON resource_files FOR ALL USING (
    auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
);
-- RLS Policies for resource_downloads
-- Anyone can insert (email submission for download)
CREATE POLICY "Anyone can submit email for download" ON resource_downloads FOR
INSERT WITH CHECK (true);
-- Only admin can read download records
CREATE POLICY "Admin can view all downloads" ON resource_downloads FOR
SELECT USING (
        auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
    );
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';
-- Trigger to auto-update updated_at
CREATE TRIGGER update_resource_pages_updated_at BEFORE
UPDATE ON resource_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count() RETURNS TRIGGER AS $$ BEGIN
UPDATE resource_files
SET download_count = download_count + 1
WHERE id = NEW.file_id;
RETURN NEW;
END;
$$ language 'plpgsql';
-- Trigger to auto-increment download count
CREATE TRIGGER increment_file_download_count
AFTER
INSERT ON resource_downloads FOR EACH ROW EXECUTE FUNCTION increment_download_count();