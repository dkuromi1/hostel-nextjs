type FaqListProps = {
  items: readonly {
    question: string;
    answer: string;
  }[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-36px_rgba(11,32,29,0.35)]"
        >
          <summary className="cursor-pointer list-none pr-10 font-heading text-xl tracking-[-0.03em] text-slate-950">
            {item.question}
          </summary>
          <p className="mt-4 max-w-[62ch] text-base leading-8 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
