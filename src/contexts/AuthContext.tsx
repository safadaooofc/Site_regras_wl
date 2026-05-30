import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AdminCapabilities, AdminRole } from "../types/admin";

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
  adminRole: AdminRole | null;
  capabilities: AdminCapabilities;
  loading: boolean;
  logout: () => void;
  refreshAuth: () => Promise<void>;
};

const emptyCaps: AdminCapabilities = {
  announcements: false,
  rulesRp: false,
  rulesEb: false,
  team: false,
  manageAdmins: false,
  importCms: false,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  adminRole: null,
  capabilities: emptyCaps,
  loading: true,
  logout: () => {},
  refreshAuth: async () => {},
});

async function fetchMe() {
  const res = await fetch("/auth/me", { credentials: "same-origin" });
  if (!res.ok) {
    return { user: null, isAdmin: false, adminRole: null, capabilities: emptyCaps };
  }
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null);
  const [capabilities, setCapabilities] = useState<AdminCapabilities>(emptyCaps);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const data = await fetchMe();
    setUser(data.user ?? null);
    setIsAdmin(Boolean(data.isAdmin));
    setAdminRole(data.adminRole ?? null);
    setCapabilities(data.capabilities ?? emptyCaps);
  };

  useEffect(() => {
    refreshAuth().finally(() => setLoading(false));
  }, []);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setAdminRole(null);
    setCapabilities(emptyCaps);
    window.location.href = "/auth/logout";
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, adminRole, capabilities, loading, logout, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
