import Link from "next/link";
import { BookOpenCheck, Layers, MessageCircle, Mic } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Logo from "@/components/Logo";
import HeroDemo from "@/components/HeroDemo";

const features = [
  { icon: MessageCircle, title: "বাংলায় প্রশ্ন করো", text: "বাংলা, ইংরেজি বা বাংলিশ — যেভাবে সুবিধা সেভাবেই জিজ্ঞেস করো। উত্তর আসবে সহজ ভাষায়।" },
  { icon: Layers, title: "যেকোনো লেখা থেকে ফ্ল্যাশকার্ড", text: "নোট বা বইয়ের অংশ পেস্ট করো। AI সেখান থেকে প্রশ্ন-উত্তরের কার্ড বানিয়ে দেবে।" },
  { icon: BookOpenCheck, title: "ক্লাস থেকে টপিক", text: "শ্রেণি, বিষয় আর অধ্যায় ধরে ধরে নিজের পড়া গুছিয়ে নাও।" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              যা পড়বে,<br />
              <span className="text-brand-600">বুঝে</span> পড়বে।
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              বুঝি AI বাংলাদেশের শিক্ষার্থীদের জন্য একজন ধৈর্যশীল পড়ার সঙ্গী। প্রশ্ন করো, কঠিন বিষয় সহজ করে নাও, আর ফ্ল্যাশকার্ডে ঝালিয়ে নাও।
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/chat" className="btn-primary"><MessageCircle className="h-5 w-5" /> Chat with AI</Link>
              <Link href="/dashboard" className="btn-secondary">Student Dashboard</Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-faint">
              <Mic className="h-4 w-4" /> ভয়েসে কথা বলার সুবিধা শীঘ্রই আসছে
            </p>
          </div>
          <HeroDemo />
        </section>

        <section className="border-y border-gray-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
                <h2 className="mt-4 text-xl font-bold">{title}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-ink-faint sm:flex-row sm:px-6">
        <Logo />
        <p>বাংলাদেশের শিক্ষার্থীদের জন্য তৈরি</p>
      </footer>
    </>
  );
}
