import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/*
  Stand-in for screens on the roadmap. Every link in the shell lands somewhere
  real, and the screen says when it arrives. Delete each one as its day ships.
*/
export default function ComingSoon({
  icon: Icon,
  title,
  body,
  day,
  children,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  day: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 pt-10 md:pt-16">
      <div className="rounded-panel bg-white px-6 py-10 text-center ring-1 ring-line">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-paan-50 text-paan-700">
          <Icon className="size-8" strokeWidth={1.6} />
        </span>
        <h1 className="mt-5 font-display text-[26px] font-bold tracking-[-0.01em] text-ink">{title}</h1>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink-2">{body}</p>
        <p className="mx-auto mt-5 inline-flex rounded-full bg-haldi-50 px-3 py-1 text-[13px] font-semibold text-haldi-800 ring-1 ring-haldi-300">
          Being built on Day {day} of the roadmap
        </p>
        {children}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-paan-600 px-6 text-sm font-semibold text-white hover:bg-paan-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
