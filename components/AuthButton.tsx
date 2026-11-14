"use client";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { loginWithGoogle } from "@/lib/api";

export default function AuthButton({ compact = false }: { compact?: boolean }) {
  const { user, loading, logout } = useAuth();
  if (loading) return <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />;

  if (!user) {
    return (
      <button onClick={loginWithGoogle} className="btn-secondary !px-4 !py-2 text-sm">
        <LogIn className="h-4 w-4" /> {compact ? "লগইন" : "Google দিয়ে লগইন"}
      </button>
    );
  }
  return (
    <div className="flex items-center gap-3">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt="" referrerPolicy="no-referrer" className="h-9 w-9 rounded-full" />
      ) : (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">
          {user.displayName?.[0] ?? "?"}
        </span>
      )}
      {!compact && <span className="max-w-[9rem] truncate text-sm font-semibold">{user.displayName}</span>}
      <button onClick={logout} aria-label="লগআউট" title="লগআউট" className="rounded-lg p-2 text-ink-soft hover:bg-gray-100 hover:text-ink">
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
