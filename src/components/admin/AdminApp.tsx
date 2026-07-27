import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AdminAuthProvider, useAdminAuth } from "./useAdminAuth";
import { LoginScreen } from "./LoginScreen";
import { AdminShell } from "./AdminShell";

/** Full-screen brand loader shown during SSR shell + while restoring the session. */
function Booting() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2E1210]">
      <Loader2 className="size-8 animate-spin text-[#C9A227]" />
    </div>
  );
}

function Gate() {
  const { user, loading } = useAdminAuth();
  if (loading) return <Booting />;
  if (!user) return <LoginScreen />;
  return <AdminShell />;
}

/**
 * The admin panel is a client-only app. During prerender we emit only a neutral
 * shell (no window, no /api calls); once mounted in the browser it boots for real.
 */
export function AdminApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Booting />;

  return (
    <AdminAuthProvider>
      <Toaster position="top-right" richColors />
      <Gate />
    </AdminAuthProvider>
  );
}
