import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-base font-medium text-ink-soft sm:flex">
          <Link href="/chat" className="hover:text-brand-700">AI চ্যাট</Link>
          <Link href="/dashboard" className="hover:text-brand-700">ড্যাশবোর্ড</Link>
          <Link href="/dashboard/flashcards" className="hover:text-brand-700">ফ্ল্যাশকার্ড</Link>
        </nav>
        <AuthButton compact />
      </div>
    </header>
  );
}
