-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create portfolio_data table to store all portfolio content
CREATE TABLE public.portfolio_data (
  id TEXT PRIMARY KEY DEFAULT 'main',
  hero JSONB NOT NULL DEFAULT '{}',
  about JSONB NOT NULL DEFAULT '{}',
  projects JSONB NOT NULL DEFAULT '[]',
  services JSONB NOT NULL DEFAULT '[]',
  contact JSONB NOT NULL DEFAULT '{}',
  chat_settings JSONB NOT NULL DEFAULT '{}',
  footer JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Public can read portfolio data (for visitors)
CREATE POLICY "Anyone can read portfolio data"
ON public.portfolio_data
FOR SELECT
USING (true);

-- Only admins can update portfolio data
CREATE POLICY "Admins can update portfolio data"
ON public.portfolio_data
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert portfolio data
CREATE POLICY "Admins can insert portfolio data"
ON public.portfolio_data
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_portfolio_data_updated_at
BEFORE UPDATE ON public.portfolio_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.portfolio_data (id) VALUES ('main');