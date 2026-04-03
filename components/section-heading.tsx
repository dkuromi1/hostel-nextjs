import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl space-y-5", className)}>
      <Badge>{eyebrow}</Badge>
      <div className="space-y-3">
        <h2 className="font-heading text-4xl leading-none tracking-[-0.06em] text-slate-950 md:text-6xl">
          {title}
        </h2>
        <p className="max-w-[62ch] text-base leading-8 text-slate-600 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
