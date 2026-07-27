import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/admin-api";
import { useAdminAuth } from "./useAdminAuth";

export function LoginScreen() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2E1210] px-4">
      <div className="w-full max-w-sm rounded-xl border border-[#C9A227]/30 bg-[#441C1A] p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid size-12 place-items-center rounded-full border border-[#C9A227]/40 text-[#C9A227]">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-4 font-serif text-2xl text-[#F7F2E7]">Dhanora Dynasty</h1>
          <p className="mt-1 text-sm text-[#F7F2E7]/60">Admin panel — sign in to continue</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#F7F2E7]/80">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#C9A227]/25 bg-[#2E1210] text-[#F7F2E7] placeholder:text-[#F7F2E7]/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[#F7F2E7]/80">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#C9A227]/25 bg-[#2E1210] text-[#F7F2E7] placeholder:text-[#F7F2E7]/30"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-[#C9A227] text-[#2E1210] hover:bg-[#C9A227]/90"
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
