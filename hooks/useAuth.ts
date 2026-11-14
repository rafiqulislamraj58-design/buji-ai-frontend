"use client";
import { useCallback, useEffect, useState } from "react";
import { fetchMe, logout as apiLogout } from "@/lib/api";
import type { User } from "@/lib/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchMe().then((u) => { if (alive) { setUser(u); setLoading(false); } });
    return () => { alive = false; };
  }, []);

  const logout = useCallback(async () => {
    try { await apiLogout(); } finally { setUser(null); }
  }, []);

  return { user, loading, logout };
}
