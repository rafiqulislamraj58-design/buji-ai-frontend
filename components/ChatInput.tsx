"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, SendHorizonal } from "lucide-react";

export default function ChatInput({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(false), 2500);
    return () => clearTimeout(t);
  }, [hint]);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="relative">
      {hint && (
        <div role="status" className="absolute -top-11 right-0 rounded-lg bg-ink px-3 py-2 text-sm text-white shadow-card">
          ভয়েস চ্যাট শীঘ্রই আসছে
        </div>
      )}
      <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-card focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); }
          }}
          placeholder="তোমার প্রশ্নটি লেখো…"
          aria-label="প্রশ্ন লেখার ঘর"
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2.5 text-base placeholder:text-ink-faint focus:outline-none"
        />
        <button type="button" onClick={() => setHint(true)} aria-label="ভয়েস চ্যাট (শীঘ্রই আসছে)" className="grid h-11 w-11 place-items-center rounded-xl text-ink-soft hover:bg-gray-100 hover:text-brand-700">
          <Mic className="h-5 w-5" />
        </button>
        <button type="button" onClick={submit} disabled={disabled || !value.trim()} aria-label="পাঠান" className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400">
          <SendHorizonal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
