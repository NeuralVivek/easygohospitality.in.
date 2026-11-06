export default function Loading() {
  return (
    <main className="editorial-shell py-16">
      <div className="rounded-[2rem] border border-[#dddddd] bg-[#ffffff] p-8 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
        <div className="h-4 w-40 animate-pulse rounded-full bg-[#dddddd]" />
        <div className="mt-5 h-12 w-3/5 animate-pulse rounded-full bg-[#e5e5e5]" />
        <div className="mt-5 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-[#eeeeee]" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-[#eeeeee]" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-[#eeeeee]" />
        </div>
      </div>
    </main>
  );
}

