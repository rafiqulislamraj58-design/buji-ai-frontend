"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { getClasses, getSubjects, getTopics } from "@/lib/api";
import { useAsync } from "@/hooks/useAsync";
import { Empty, ErrorNote, Skeleton } from "./ui";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
      <h2 className="mb-3 px-1 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left font-medium transition ${active ? "bg-brand-600 text-white shadow-lift" : "hover:bg-gray-50"}`}>
      <span>{children}</span><ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
    </button>
  );
}

export default function AcademicBrowser() {
  const [classId, setClassId] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  const classes = useAsync(getClasses, "classes");
  const subjects = useAsync(() => getSubjects(classId!), classId);
  const topics = useAsync(() => getTopics(subjectId!), subjectId);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Column title="শ্রেণি">
        {classes.loading ? <Skeleton /> : classes.error ? <ErrorNote message={classes.error} onRetry={classes.reload} /> :
          !classes.data?.length ? <Empty title="কোনো শ্রেণি নেই" /> :
          <div className="space-y-1">
            {classes.data.map((c) => (
              <Row key={c._id} active={classId === c._id} onClick={() => { setClassId(c._id); setSubjectId(null); }}>
                {c.name} <span className={`ml-1 text-sm ${classId === c._id ? "text-brand-100" : "text-ink-faint"}`}>{c.level}</span>
              </Row>
            ))}
          </div>}
      </Column>

      <Column title="বিষয়">
        {!classId ? <Empty title="একটি শ্রেণি বেছে নাও" /> :
          subjects.loading ? <Skeleton rows={3} /> : subjects.error ? <ErrorNote message={subjects.error} onRetry={subjects.reload} /> :
          !subjects.data?.length ? <Empty title="এই শ্রেণিতে এখনো বিষয় নেই" /> :
          <div className="space-y-1">
            {subjects.data.map((s) => <Row key={s._id} active={subjectId === s._id} onClick={() => setSubjectId(s._id)}>{s.name}</Row>)}
          </div>}
      </Column>

      <Column title="অধ্যায়">
        {!subjectId ? <Empty title="একটি বিষয় বেছে নাও" /> :
          topics.loading ? <Skeleton rows={3} /> : topics.error ? <ErrorNote message={topics.error} onRetry={topics.reload} /> :
          !topics.data?.length ? <Empty title="এই বিষয়ে এখনো অধ্যায় নেই" /> :
          <ul className="space-y-1">
            {[...topics.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((t) => (
              <li key={t._id}>
                <Link href={`/dashboard/flashcards?topic=${t._id}&class=${classId}&subject=${subjectId}`}
                  className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 font-medium hover:bg-brand-50 hover:text-brand-700">
                  <span>{t.title}</span><Layers className="h-4 w-4 shrink-0 text-brand-600" aria-label="ফ্ল্যাশকার্ড দেখুন" />
                </Link>
              </li>
            ))}
          </ul>}
      </Column>
    </div>
  );
}
