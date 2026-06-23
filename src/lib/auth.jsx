import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    currentSession.then(({ data }) => {
      setSession(data.session || null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.id) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, tier, points, created_at")
        .eq("id", session.user.id)
        .single();

      if (!error) {
        setProfile(data);
      }
    };

    loadProfile();
  }, [session]);

  const value = {
    session,
    profile,
    loading,
    signIn: async (email, password) => {
      return supabase.auth.signInWithPassword({ email, password });
    },
    signUp: async (email, password, full_name) => {
      return supabase.auth.signUp({ email, password, options: { data: { full_name } } });
    },
    signOut: async () => {
      return supabase.auth.signOut();
    },
    refreshProfile: async () => {
      if (!session?.user?.id) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, tier, points, created_at")
        .eq("id", session.user.id)
        .single();
      if (!error) setProfile(data);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
