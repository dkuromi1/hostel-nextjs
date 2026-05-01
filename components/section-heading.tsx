import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionLabel } from "@/components/ui/section-label";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  variant?: "default" | "simple";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  variant = "default",
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col items-start gap-5", className)}>
      {variant === "default" ? (
        <Eyebrow>{eyebrow}</Eyebrow>
      ) : (
        <SectionLabel>{eyebrow}</SectionLabel>
      )}
      <div className="flex flex-col gap-3">
        <h2 className={cn("heading-section text-[var(--text-heading)]", titleClassName)}>
          {title}
        </h2>
        <p className="max-w-[62ch] text-section-desc">
          {description}
        </p>
      </div>
    </div>
  );
}
