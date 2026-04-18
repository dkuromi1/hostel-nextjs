import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

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
    <div className={cn("flex max-w-2xl flex-col items-start gap-5", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-4xl leading-none tracking-[-0.06em] text-foreground md:text-6xl">
          {title}
        </h2>
        <p className="max-w-[62ch] text-base leading-8 text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
