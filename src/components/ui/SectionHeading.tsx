import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-4",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-medium tracking-normal text-charcoal sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-charcoal/65 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
