import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SectionHeader({
  title,
  href,
  linkLabel = "See all",
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end gap-3 md:mb-4">
      <h2 className="font-display text-[21px] font-bold tracking-[-0.01em] text-ink md:text-2xl">
        {title}
      </h2>
      {children}
      {href && (
        <Link
          href={href}
          className="ml-auto flex shrink-0 items-center text-sm font-semibold text-paan-700 hover:text-paan-800"
        >
          {linkLabel}
          <ChevronRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
