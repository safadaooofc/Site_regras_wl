import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type DiscordUser = {
  id: string;
  username: string;
  globalName: string | null;
  avatar: string | null;
  avatarUrl: string;
};

type AuthContextType = {
  user: DiscordUser | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: () => {},
  refreshAuth: async () => {},
});

async function fetchMe() {
  const res = await fetch("/auth/me", { credentials: "same-origin" });
  if (!res.ok) return { user: null, isAdmin: false };
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const data = await fetchMe();
    setUser(data.user ?? null);
    setIsAdmin(Boolean(data.isAdmin));
  };

  useEffect(() => {
    refreshAuth().finally(() => setLoading(false));
  }, []);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    window.location.href = "/auth/logout";
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
