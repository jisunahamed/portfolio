-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 1. Create Enum for App Roles
DO $$ BEGIN CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
-- 2. Create User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
-- Enable RLS on User Roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
-- 3. Create Helper Function to Check Roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role text) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$ BEGIN RETURN EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
            AND role = _role::app_role
    );
END;
$$;
-- 4. RLS Policies for User Roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR
SELECT TO authenticated USING (auth.uid() = user_id);
-- 5. Create Portfolio Data Table
CREATE TABLE IF NOT EXISTS public.portfolio_data (
    id TEXT PRIMARY KEY DEFAULT 'main',
    hero JSONB NOT NULL DEFAULT '{}',
    about JSONB NOT NULL DEFAULT '{}',
    projects JSONB NOT NULL DEFAULT '[]',
    services JSONB NOT NULL DEFAULT '[]',
    contact JSONB NOT NULL DEFAULT '{}',
    chat_settings JSONB NOT NULL DEFAULT '{}',
    footer JSONB NOT NULL DEFAULT '{}',
    faq JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
-- Enable RLS on Portfolio Data
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;
-- 6. RLS Policies for Portfolio Data
DROP POLICY IF EXISTS "Anyone can read portfolio data" ON public.portfolio_data;
CREATE POLICY "Anyone can read portfolio data" ON public.portfolio_data FOR
SELECT USING (true);
DROP POLICY IF EXISTS "Admins can update portfolio data" ON public.portfolio_data;
CREATE POLICY "Admins can update portfolio data" ON public.portfolio_data FOR
UPDATE USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can insert portfolio data" ON public.portfolio_data;
CREATE POLICY "Admins can insert portfolio data" ON public.portfolio_data FOR
INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
-- 7. Insert Default Data (if not exists)
INSERT INTO public.portfolio_data (id)
VALUES ('main') ON CONFLICT (id) DO NOTHING;
-- 8. Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS update_portfolio_data_updated_at ON public.portfolio_data;
CREATE TRIGGER update_portfolio_data_updated_at BEFORE
UPDATE ON public.portfolio_data FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();