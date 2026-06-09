import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  tone?: "success" | "error";
}

export function Toast({ message, tone = "success" }: ToastProps) {
  const Icon = tone === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed left-1/2 top-24 z-50 flex w-[min(92vw,26rem)] -translate-x-1/2 animate-toast-in items-center gap-3 border px-5 py-4 text-sm font-semibold shadow-xl",
        tone === "success"
          ? "border-gold/30 bg-charcoal text-cream"
          : "border-red-200 bg-white text-red-700",
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
