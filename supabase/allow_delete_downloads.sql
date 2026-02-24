-- Allow admin to delete download records
CREATE POLICY "Admin can delete downloads" ON resource_downloads FOR DELETE USING (
    (
        select auth.jwt()->>'email'
    ) = 'jisunahamed525@gmail.com'
);