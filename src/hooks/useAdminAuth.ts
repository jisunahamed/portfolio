import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
}

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
  });

  // Check if user has admin role
  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });
    
    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
    return data === true;
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        // Check admin role after auth state change (deferred to avoid deadlock)
        if (session?.user) {
          setTimeout(async () => {
            const isAdmin = await checkAdminRole(session.user.id);
            setAuthState(prev => ({ ...prev, isAdmin, isLoading: false }));
          }, 0);
        } else {
          setAuthState(prev => ({ ...prev, isAdmin: false, isLoading: false }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const isAdmin = await checkAdminRole(session.user.id);
        setAuthState({
          session,
          user: session.user,
          isAdmin,
          isLoading: false,
        });
      } else {
        setAuthState({
          session: null,
          user: null,
          isAdmin: false,
          isLoading: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  const login = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setAuthState({
      session: null,
      user: null,
      isAdmin: false,
      isLoading: false,
    });
  }, []);

  return {
    user: authState.user,
    session: authState.session,
    isAdmin: authState.isAdmin,
    isLoggedIn: !!authState.session,
    isLoading: authState.isLoading,
    login,
    signUp,
    logout,
  };
};
