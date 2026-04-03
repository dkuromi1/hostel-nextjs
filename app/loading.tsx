export default function Loading() {
  return (
    <div className="shell-container py-16">
      <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.35)]">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 rounded-full bg-slate-200" />
          <div className="h-14 max-w-3xl rounded-3xl bg-slate-200" />
          <div className="h-8 max-w-2xl rounded-2xl bg-slate-200" />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-96 rounded-[28px] bg-slate-200" />
            <div className="grid gap-4">
              <div className="h-44 rounded-[28px] bg-slate-200" />
              <div className="h-44 rounded-[28px] bg-slate-200" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-32 rounded-[28px] bg-slate-200" />
            <div className="h-32 rounded-[28px] bg-slate-200" />
            <div className="h-32 rounded-[28px] bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
