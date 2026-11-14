"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Logo from "@/components/Logo";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { TypingBubble, type ChatMsg } from "@/components/ChatMessage";
import { askAI, getErrorMessage } from "@/lib/api";

const suggestions = [
  "সালোকসংশ্লেষণ কী? সহজ করে বলো",
  "নিউটনের তিনটি সূত্র উদাহরণসহ বুঝিয়ে দাও",
  "Explain Present Perfect Tense with examples",
  "HSC পরীক্ষার আগে কীভাবে রিভিশন দেব?",
];
const uid = () => Math.random().toString(36).slice(2);

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, loading]);

  const send = async (question: string) => {
    setMessages((m) => [...m, { id: uid(), role: "user", content: question }]);
    setLoading(true);
    try {
      const answer = await askAI(question);
      setMessages((m) => [...m, { id: uid(), role: "ai", content: answer }]);
    } catch (e) {
      setMessages((m) => [...m, { id: uid(), role: "ai", content: getErrorMessage(e), error: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="হোমে ফিরুন" className="rounded-lg p-2 text-ink-soft hover:bg-gray-100"><ArrowLeft className="h-5 w-5" /></Link>
            <Logo />
          </div>
          <button onClick={() => setMessages([])} disabled={!messages.length || loading} className="btn-secondary !px-3 !py-2 text-sm">
            <RotateCcw className="h-4 w-4" /> নতুন চ্যাট
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
          {messages.length === 0 ? (
            <div className="pt-8 text-center sm:pt-16">
              <h1 className="text-3xl font-bold sm:text-4xl">আজ কী শিখতে চাও?</h1>
              <p className="mx-auto mt-3 max-w-md text-ink-soft">যেকোনো বিষয়ে প্রশ্ন করো। আমি সহজ ভাষায় বুঝিয়ে দেব।</p>
              <div className="mx-auto mt-8 grid max-w-xl gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium shadow-card transition hover:border-brand-300 hover:text-brand-700">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => <ChatMessage key={m.id} msg={m} />)
          )}
          {loading && <TypingBubble />}
          <div ref={endRef} />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-canvas pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <ChatInput onSend={send} disabled={loading} />
          <p className="mt-2 text-center text-xs text-ink-faint">AI ভুল করতে পারে। গুরুত্বপূর্ণ তথ্য পাঠ্যবই থেকে মিলিয়ে নাও।</p>
        </div>
      </footer>
    </div>
  );
}
