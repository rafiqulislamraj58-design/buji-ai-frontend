import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Bujhi AI হোম">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 font-display text-xl font-extrabold leading-none text-white shadow-lift">
        বু
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        বুঝি <span className="text-brand-600">AI</span>
      </span>
    </Link>
  );
}
