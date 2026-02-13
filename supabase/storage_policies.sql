-- Storage Bucket Policies for resource-files bucket
-- Run this in Supabase SQL Editor to enable uploads
-- 1. Allow authenticated users (admin) to upload files
CREATE POLICY "Allow admin to upload files" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'resource-files'
        AND auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
    );
-- 2. Allow admin to update files
CREATE POLICY "Allow admin to update files" ON storage.objects FOR
UPDATE TO authenticated USING (
        bucket_id = 'resource-files'
        AND auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
    ) WITH CHECK (
        bucket_id = 'resource-files'
        AND auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
    );
-- 3. Allow admin to delete files
CREATE POLICY "Allow admin to delete files" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'resource-files'
    AND auth.jwt()->>'email' = 'jisunahamed525@gmail.com'
);
-- 4. Allow everyone to read files (for downloads)
CREATE POLICY "Allow public to read files" ON storage.objects FOR
SELECT TO public USING (bucket_id = 'resource-files');