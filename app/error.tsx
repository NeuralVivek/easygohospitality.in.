"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="editorial-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
        <p className="text-xs uppercase tracking-[0.24em] text-[#555555]">Something went wrong</p>
        <h1 className="serif-display mt-3 text-5xl text-[#111111]">We need a quick fix.</h1>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#ffffff]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

