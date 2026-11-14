import AcademicBrowser from "@/components/AcademicBrowser";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold sm:text-4xl">তোমার পাঠ্যক্রম</h1>
      <p className="mb-8 mt-2 text-ink-soft">শ্রেণি → বিষয় → অধ্যায় বেছে নিয়ে ফ্ল্যাশকার্ডে পড়া শুরু করো।</p>
      <AcademicBrowser />
    </>
  );
}
