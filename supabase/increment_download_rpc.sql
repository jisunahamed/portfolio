-- Function to increment download count by file ID (safe RPC)
CREATE OR REPLACE FUNCTION increment_download_count_by_id(file_uuid UUID) RETURNS VOID AS $$ BEGIN
UPDATE resource_files
SET download_count = download_count + 1
WHERE id = file_uuid;
END;
$$ LANGUAGE plpgsql;