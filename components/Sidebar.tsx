"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

const nav = [
  { href: "/dashboard", label: "পাঠ্যক্রম", icon: BookOpen, exact: true },
  { href: "/dashboard/flashcards", label: "ফ্ল্যাশকার্ড", icon: Layers },
  { href: "/chat", label: "AI চ্যাট", icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5"><Logo />
        <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden" onClick={() => setOpen(false)} aria-label="মেনু বন্ধ করুন"><X className="h-5 w-5" /></button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="ড্যাশবোর্ড মেনু">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 font-semibold transition ${active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-gray-50 hover:text-ink"}`}>
              <Icon className="h-5 w-5" /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-100 p-4"><AuthButton /></div>
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <Logo />
        <button onClick={() => setOpen(true)} aria-label="মেনু খুলুন" className="rounded-lg p-2 hover:bg-gray-100"><Menu className="h-6 w-6" /></button>
      </div>
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white lg:block">{content}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-card">{content}</aside>
        </div>
      )}
    </>
  );
}
