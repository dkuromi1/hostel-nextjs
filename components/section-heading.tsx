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
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  variant = "default",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;

  return (
    <div className={cn("flex max-w-2xl flex-col items-start gap-5", className)}>
      {variant === "default" ? (
        <Eyebrow>{eyebrow}</Eyebrow>
      ) : (
        <SectionLabel>{eyebrow}</SectionLabel>
      )}
      <div className="flex flex-col gap-3">
        <HeadingTag className={cn(headingLevel === "h1" ? "heading-page" : "heading-section", "text-[var(--text-heading)]", titleClassName)}>
          {title}
        </HeadingTag>
        <p className="max-w-[62ch] text-section-desc">
          {description}
        </p>
      </div>
    </div>
  );
}
