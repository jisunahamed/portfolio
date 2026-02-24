-- Custom Pages System Schema
-- Standalone pages for documentation, accessible only via direct URL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS custom_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT DEFAULT '',
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;
-- Public can view published pages
CREATE POLICY "Anyone can view published custom pages" ON custom_pages FOR
SELECT USING (is_published = true);
-- Admin full access
CREATE POLICY "Admin full access to custom pages" ON custom_pages FOR ALL USING (
    (
        select auth.jwt()->>'email'
    ) = 'jisunahamed525@gmail.com'
);
-- Auto-update updated_at
CREATE TRIGGER update_custom_pages_updated_at BEFORE
UPDATE ON custom_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();