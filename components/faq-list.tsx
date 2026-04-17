"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

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
        "group rounded-2xl border border-transparent bg-slate-50 p-5 transition-all duration-300",
        "hover:border-emerald-200/50 hover:bg-white hover:shadow-sm",
        isOpen && "border-emerald-200/50 bg-white shadow-sm"
      )}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left outline-none"
      >
        <span
          className={cn(
            "font-heading text-base font-medium transition-colors",
            isOpen ? "text-emerald-950" : "text-slate-900 group-hover:text-emerald-900"
          )}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-0",
            isOpen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-200/50 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
          )}
        >
          <Plus className="size-4" />
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
              height: { type: "spring", damping: 20, stiffness: 180 },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <div className="mt-3 pr-6 text-sm leading-7 text-slate-600">
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
