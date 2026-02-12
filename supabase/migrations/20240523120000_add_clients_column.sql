-- Add clients column to portfolio_data table
ALTER TABLE public.portfolio_data
ADD COLUMN IF NOT EXISTS clients JSONB DEFAULT '[]'::jsonb;
-- Comment on the column
COMMENT ON COLUMN public.portfolio_data.clients IS 'List of trusted clients/logos';