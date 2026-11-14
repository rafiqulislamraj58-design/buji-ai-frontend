"use client";
import { motion } from "framer-motion";

/** Purely visual flip card. The parent decides when it flips. */
export default function FlashcardView({
  question, answer, flipped,
}: { question: string; answer: string; flipped: boolean }) {
  const face = "absolute inset-0 flex flex-col justify-between rounded-3xl p-6 sm:p-8 [backface-visibility:hidden] overflow-hidden";
  return (
    <div className="w-full [perspective:1400px]">
      <motion.div
        className="relative h-72 w-full [transform-style:preserve-3d] sm:h-80"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
      >
        <div className={`${face} border border-gray-100 bg-white shadow-card`}>
          <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">প্রশ্ন</span>
          <p className="overflow-y-auto text-balance text-center font-display text-2xl font-semibold leading-snug sm:text-3xl">{question}</p>
          <span className="text-center text-sm text-ink-faint">উত্তর দেখতে ট্যাপ করুন</span>
        </div>
        <div className={`${face} bg-brand-600 text-white shadow-lift [transform:rotateY(180deg)]`}>
          <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">উত্তর</span>
          <p className="overflow-y-auto text-balance text-center text-xl font-medium leading-relaxed sm:text-2xl">{answer}</p>
          <span className="text-center text-sm text-brand-100">প্রশ্ন দেখতে ট্যাপ করুন</span>
        </div>
      </motion.div>
    </div>
  );
}
