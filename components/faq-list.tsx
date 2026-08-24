"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@/lib/icon-registry";

import { cn } from "@/lib/utils";

type FaqItemProps = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const panelId = `faq-panel-${id}`;
  const triggerId = `faq-trigger-${id}`;

  return (
    <div
      className={cn(
        "group rounded-2xl border border-[var(--brand-primary)]/20 bg-[var(--glass-bg)] p-4 sm:p-5 shadow-sm transition-all duration-300",
        isOpen && "border-[var(--brand-primary)]/20 bg-[var(--glass-bg)] shadow-sm"
      )}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((o) => !o)}
        className="relative flex w-full cursor-pointer items-start justify-between sm:gap-4 text-left outline-none"
      >
        <span
          className={cn(
            "font-heading text-base font-medium transition-colors pr-10 sm:pr-0",
            isOpen ? "text-[var(--brand-primary)]" : "text-[var(--text-heading)] group-hover:text-[var(--brand-primary)]"
          )}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className={cn(
            "absolute right-0 top-0 sm:static mt-0.5 flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full transition-all duration-0",
            isOpen
              ? "bg-[var(--brand-primary)]/15 text-[var(--brand-primary)]"
              : "bg-[var(--muted)] text-[var(--text-muted)] group-hover:bg-[var(--brand-primary)]/15 group-hover:text-[var(--brand-primary)]"
          )}
        >
          <Plus className="size-3.5 sm:size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 pr-0 sm:pr-6 text-sm leading-snug text-[var(--text-body-subtle)]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
