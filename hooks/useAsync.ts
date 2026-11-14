"use client";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api";

/** Runs `fn` whenever `key` changes. Pass key=null to skip. */
export function useAsync<T>(fn: () => Promise<T>, key: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (key === null) { setData(null); setError(null); setLoading(false); return; }
    let alive = true;
    setLoading(true); setError(null); setData(null);
    fn()
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(getErrorMessage(e)))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce]);

  return { data, loading, error, reload: () => setNonce((n) => n + 1) };
}
