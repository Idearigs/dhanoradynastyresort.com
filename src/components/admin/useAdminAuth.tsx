/* eslint-disable react-refresh/only-export-components -- provider + its hook are
   colocated by convention; fast refresh is unaffected in practice. */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth, ApiError, type AdminUser } from "@/lib/admin-api";

type AuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session on mount. A 401 just means "not logged in".
  useEffect(() => {
    let cancelled = false;
    auth
      .me()
      .then((u) => !cancelled && setUser(u))
      .catch((e) => {
        if (!(e instanceof ApiError) || e.status !== 401) console.error(e);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setUser(await auth.login(email, password));
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAdminAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
