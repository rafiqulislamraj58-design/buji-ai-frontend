"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import type { Flashcard } from "@/lib/types";
import FlashcardView from "./FlashcardView";

const SWIPE = 90;
const variants = {
  enter: (d: number) => ({ x: d * 220, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d * -220, opacity: 0, scale: 0.95 }),
};

export default function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [deck, setDeck] = useState(cards);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { setDeck(cards); setI(0); setFlipped(false); }, [cards]);

  const go = useCallback((step: number) => {
    setDir(step);
    setFlipped(false);
    setI((cur) => Math.min(deck.length - 1, Math.max(0, cur + step)));
  }, [deck.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const shuffle = () => {
    setDeck((d) => [...d].sort(() => Math.random() - 0.5));
    setI(0); setFlipped(false); setDir(1);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE) go(1);
    else if (info.offset.x > SWIPE) go(-1);
  };

  const card = deck[i];
  if (!card) return null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuemin={1} aria-valuemax={deck.length} aria-valuenow={i + 1}>
          <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${((i + 1) / deck.length) * 100}%` }} />
        </div>
        <span className="text-sm font-semibold tabular-nums text-ink-soft">{i + 1} / {deck.length}</span>
      </div>

      <div className="overflow-hidden px-1 py-2">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={`${card._id ?? card.question}-${i}`}
            custom={dir}
            variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.2 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
            onDragEnd={onDragEnd}
            onTap={() => setFlipped((f) => !f)}
            className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
            role="button" tabIndex={0}
            aria-label={flipped ? "প্রশ্ন দেখান" : "উত্তর দেখান"}
            onKeyDown={(e) => { if (e.key === "Enter") setFlipped((f) => !f); }}
          >
            <FlashcardView question={card.question} answer={card.answer} flipped={flipped} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button onClick={() => go(-1)} disabled={i === 0} className="btn-secondary !p-3" aria-label="আগের কার্ড"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={shuffle} className="btn-secondary !px-4 !py-3"><Shuffle className="h-4 w-4" /> মিশিয়ে দিন</button>
        <button onClick={() => go(1)} disabled={i === deck.length - 1} className="btn-secondary !p-3" aria-label="পরের কার্ড"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <p className="mt-3 text-center text-sm text-ink-faint">সোয়াইপ করুন অথবা ← → কী, স্পেস চেপে উত্তর দেখুন</p>
    </div>
  );
}
