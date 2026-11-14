"use client";
import { useState } from "react";
import FlashcardView from "./FlashcardView";

/** A live, tappable card in the hero — the product's core interaction, shown immediately. */
export default function HeroDemo() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="mb-4 ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-3 text-white shadow-lift">
        সালোকসংশ্লেষণ সহজ করে বুঝিয়ে দাও
      </div>
      <div className="mb-6 w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-card">
        গাছ সূর্যের আলো, পানি আর কার্বন ডাই-অক্সাইড দিয়ে নিজের খাবার বানায়। ঠিক যেমন তুমি ভাত রান্না করো, গাছ রান্না করে আলো দিয়ে।
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "প্রশ্ন দেখান" : "উত্তর দেখান"}
        className="block w-full rotate-[-2deg] text-left transition-transform hover:rotate-0"
      >
        <FlashcardView
          flipped={flipped}
          question="সালোকসংশ্লেষণে গাছ কী কী ব্যবহার করে?"
          answer="সূর্যের আলো, পানি এবং কার্বন ডাই-অক্সাইড। ফলাফল: গ্লুকোজ ও অক্সিজেন।"
        />
      </button>
    </div>
  );
}
