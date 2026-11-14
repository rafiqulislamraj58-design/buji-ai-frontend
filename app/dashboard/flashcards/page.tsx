"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import TopicPicker from "@/components/TopicPicker";
import FlashcardDeck from "@/components/FlashcardDeck";
import FlashcardGenerator from "@/components/FlashcardGenerator";
import { Empty, ErrorNote, Skeleton } from "@/components/ui";
import { getFlashcards } from "@/lib/api";
import { useAsync } from "@/hooks/useAsync";

type Tab = "study" | "generate";

function FlashcardsContent() {
  const params = useSearchParams();
  const [topicId, setTopicId] = useState(params.get("topic") ?? "");
  const [tab, setTab] = useState<Tab>("study");
  const [notice, setNotice] = useState<string | null>(null);

  const cards = useAsync(() => getFlashcards(topicId), topicId || null);

  return (
    <>
      <h1 className="text-3xl font-bold sm:text-4xl">ফ্ল্যাশকার্ড</h1>
      <p className="mb-6 mt-2 text-ink-soft">অধ্যায় বেছে নিয়ে কার্ডে ঝালিয়ে নাও, অথবা নিজের লেখা থেকে নতুন কার্ড বানাও।</p>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
        <TopicPicker topicId={topicId} onTopicChange={setTopicId}
          initialClassId={params.get("class") ?? ""} initialSubjectId={params.get("subject") ?? ""} />
      </div>

      <div role="tablist" className="my-6 inline-flex rounded-xl bg-gray-200/70 p-1">
        {([["study", "পড়ো"], ["generate", "AI দিয়ে বানাও"]] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setNotice(null); }}
            className={`rounded-lg px-5 py-2 font-semibold transition ${tab === id ? "bg-white text-brand-700 shadow-card" : "text-ink-soft"}`}>
            {label}
          </button>
        ))}
      </div>

      {notice && (
        <p role="status" className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-800">
          <CheckCircle2 className="h-5 w-5" /> {notice}
        </p>
      )}

      {tab === "study" ? (
        !topicId ? <Empty title="একটি অধ্যায় বেছে নাও" hint="উপরের তিনটি ড্রপডাউন থেকে শ্রেণি, বিষয় ও অধ্যায় নির্বাচন করো।" /> :
        cards.loading ? <Skeleton rows={3} /> :
        cards.error ? <ErrorNote message={cards.error} onRetry={cards.reload} /> :
        !cards.data?.length ? (
          <div className="space-y-4 text-center">
            <Empty title="এই অধ্যায়ে এখনো কোনো কার্ড নেই" hint="নিজের নোট পেস্ট করে AI দিয়ে কার্ড বানিয়ে নাও।" />
            <button className="btn-primary" onClick={() => setTab("generate")}>কার্ড বানাও</button>
          </div>
        ) : <FlashcardDeck cards={cards.data} />
      ) : (
        <FlashcardGenerator topicId={topicId} onSaved={(n) => { setNotice(`${n}টি কার্ড সেভ হয়েছে।`); cards.reload(); setTab("study"); }} />
      )}
    </>
  );
}

export default function FlashcardsPage() {
  return <Suspense fallback={<Skeleton rows={3} />}><FlashcardsContent /></Suspense>;
}
