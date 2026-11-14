import { Sparkles } from "lucide-react";

export interface ChatMsg { id: string; role: "user" | "ai"; content: string; error?: boolean }

export default function ChatMessage({ msg }: { msg: ChatMsg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-brand-600 px-4 py-3 text-white shadow-lift sm:max-w-[70%]">
          {msg.content}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700"><Sparkles className="h-4 w-4" /></span>
      <p className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-md px-4 py-3 shadow-card sm:max-w-[70%] ${msg.error ? "border border-red-200 bg-red-50 text-red-800" : "bg-white"}`}>
        {msg.content}
      </p>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex items-start gap-3" aria-live="polite" aria-label="Bujhi AI লিখছে">
      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700"><Sparkles className="h-4 w-4" /></span>
      <div className="flex gap-1.5 rounded-2xl rounded-tl-md bg-white px-4 py-4 shadow-card">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-brand-400" style={{ animationDelay: `${d * 140}ms` }} />
        ))}
      </div>
    </div>
  );
}
