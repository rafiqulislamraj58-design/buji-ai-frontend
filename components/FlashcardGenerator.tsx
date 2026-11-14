"use client";
import { useState } from "react";
import { Save, Sparkles, X } from "lucide-react";
import { generateFlashcards, getErrorMessage, saveFlashcards } from "@/lib/api";
import type { Flashcard } from "@/lib/types";
import { ErrorNote, Spinner } from "./ui";

export default function FlashcardGenerator({ topicId, onSaved }: { topicId: string; onSaved: (count: number) => void }) {
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [busy, setBusy] = useState<"gen" | "save" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setBusy("gen"); setError(null);
    try {
      const result = await generateFlashcards(text.trim(), count);
      if (!Array.isArray(result) || !result.length) throw new Error("empty");
      setCards(result);
    } catch (e) {
      setError(e instanceof Error && e.message === "empty" ? "AI কোনো কার্ড বানাতে পারেনি। লেখাটি আরেকটু বড় করে দিন।" : getErrorMessage(e));
    } finally { setBusy(null); }
  };

  const save = async () => {
    setBusy("save"); setError(null);
    try {
      await saveFlashcards(topicId, cards);
      onSaved(cards.length);
      setCards([]); setText("");
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setBusy(null); }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
        <label htmlFor="source" className="block font-semibold">পড়ার লেখা পেস্ট করো</label>
        <textarea id="source" rows={8} value={text} onChange={(e) => setText(e.target.value)} disabled={busy !== null}
          placeholder="বইয়ের অনুচ্ছেদ বা নিজের নোট এখানে পেস্ট করো…" className="field mt-2 resize-y" />
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold text-ink-soft">কার্ডের সংখ্যা
            <select className="field mt-1 !w-28" value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[3, 5, 8, 10, 15].map((n) => <option key={n} value={n}>{n}টি</option>)}
            </select>
          </label>
          <button onClick={generate} disabled={!text.trim() || busy !== null} className="btn-primary">
            {busy === "gen" ? <Spinner /> : <Sparkles className="h-5 w-5" />} Generate Flashcards
          </button>
        </div>
      </div>

      {error && <ErrorNote message={error} />}

      {cards.length > 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold">{cards.length}টি কার্ড তৈরি হয়েছে</h3>
            <button onClick={save} disabled={!topicId || busy !== null} className="btn-primary !py-2.5">
              {busy === "save" ? <Spinner /> : <Save className="h-4 w-4" />} অধ্যায়ে সেভ করুন
            </button>
          </div>
          {!topicId && <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">সেভ করতে উপরে শ্রেণি, বিষয় ও অধ্যায় বেছে নাও।</p>}
          <ul className="space-y-3">
            {cards.map((c, i) => (
              <li key={i} className="relative rounded-xl border border-gray-100 bg-canvas p-4 pr-12">
                <p className="font-semibold">{c.question}</p>
                <p className="mt-1 text-ink-soft">{c.answer}</p>
                <button onClick={() => setCards((cs) => cs.filter((_, j) => j !== i))} aria-label="কার্ড মুছুন"
                  className="absolute right-2 top-2 rounded-lg p-2 text-ink-faint hover:bg-white hover:text-red-600"><X className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
