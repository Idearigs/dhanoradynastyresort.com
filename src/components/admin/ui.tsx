import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

/** Labelled form field with optional hint text. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Loading() {
  return (
    <div className="grid place-items-center py-20">
      <Loader2 className="size-6 animate-spin text-[#441C1A]" />
    </div>
  );
}

export function ErrorBox({ message }: { message?: string }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message ?? "Could not load data. Is the API reachable?"}
    </div>
  );
}
