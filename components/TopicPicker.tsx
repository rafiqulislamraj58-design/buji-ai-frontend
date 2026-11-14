"use client";
import { useState } from "react";
import { getClasses, getSubjects, getTopics } from "@/lib/api";
import { useAsync } from "@/hooks/useAsync";

interface Props {
  topicId: string;
  onTopicChange: (id: string) => void;
  initialClassId?: string;
  initialSubjectId?: string;
}

export default function TopicPicker({ topicId, onTopicChange, initialClassId = "", initialSubjectId = "" }: Props) {
  const [classId, setClassId] = useState(initialClassId);
  const [subjectId, setSubjectId] = useState(initialSubjectId);

  const classes = useAsync(getClasses, "classes");
  const subjects = useAsync(() => getSubjects(classId), classId || null);
  const topics = useAsync(() => getTopics(subjectId), subjectId || null);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="block text-sm font-semibold text-ink-soft">শ্রেণি
        <select className="field mt-1" value={classId} onChange={(e) => { setClassId(e.target.value); setSubjectId(""); onTopicChange(""); }}>
          <option value="">{classes.loading ? "লোড হচ্ছে…" : "বেছে নাও"}</option>
          {classes.data?.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold text-ink-soft">বিষয়
        <select className="field mt-1" value={subjectId} disabled={!classId} onChange={(e) => { setSubjectId(e.target.value); onTopicChange(""); }}>
          <option value="">{subjects.loading ? "লোড হচ্ছে…" : "বেছে নাও"}</option>
          {subjects.data?.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold text-ink-soft">অধ্যায়
        <select className="field mt-1" value={topicId} disabled={!subjectId} onChange={(e) => onTopicChange(e.target.value)}>
          <option value="">{topics.loading ? "লোড হচ্ছে…" : "বেছে নাও"}</option>
          {topics.data?.map((t) => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
      </label>
    </div>
  );
}
