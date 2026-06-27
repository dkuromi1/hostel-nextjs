import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionLabel } from "@/components/ui/section-label";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  variant?: "default" | "simple" | "light";
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  layout?: "default" | "split";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  variant = "default",
  headingLevel = "h2",
  layout = "default",
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;
  const isLight = variant === "light";

  if (layout === "split") {
    return (
      <div className={cn("grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-end w-full max-w-none", className)}>
        <div className="flex flex-col items-start gap-4">
          {variant === "simple" ? (
            <SectionLabel>{eyebrow}</SectionLabel>
          ) : (
            <Eyebrow variant={isLight ? "footer" : "default"}>{eyebrow}</Eyebrow>
          )}
          <HeadingTag className={cn(
            headingLevel === "h1" ? "heading-page" : "heading-section", 
            isLight ? "text-white" : "text-[var(--text-heading)]", 
            titleClassName
          )}>
            {title}
          </HeadingTag>
        </div>
        <div className="lg:border-l lg:border-[var(--border)] lg:pl-8 py-1">
          <p className={cn(
            "max-w-[48ch] text-section-desc",
            isLight ? "text-white/80" : "text-[var(--text-body-subtle)]"
          )}>
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex max-w-2xl flex-col items-start gap-5", className)}>
      {variant === "simple" ? (
        <SectionLabel>{eyebrow}</SectionLabel>
      ) : (
        <Eyebrow variant={isLight ? "footer" : "default"}>{eyebrow}</Eyebrow>
      )}
      <div className="flex flex-col gap-3">
        <HeadingTag className={cn(
          headingLevel === "h1" ? "heading-page" : "heading-section", 
          isLight ? "text-white" : "text-[var(--text-heading)]", 
          titleClassName
        )}>
          {title}
        </HeadingTag>
        <p className={cn(
          "max-w-[62ch] text-section-desc",
          isLight && "text-white/80"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
}

