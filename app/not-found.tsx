import Link from "next/link";

export default function NotFound() {
  return (
    <main className="editorial-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
        <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Page not found</p>
        <h1 className="serif-display mt-3 text-5xl text-[#111111]">This stay moved on.</h1>
        <p className="mt-4 max-w-md text-base text-[#666666]">
          We couldn&apos;t find the page you were looking for, but there are plenty of stays to explore across India.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#ffffff]">
          Go to homepage
        </Link>
      </div>
    </main>
  );
}

