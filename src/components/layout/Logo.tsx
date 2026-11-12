import Link from "next/link";

/** Price-tag mark plus wordmark. The tag shape is the motif used across the app. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className={className}>
      <g transform="rotate(-14 18 18)">
        <path
          d="M10 5h16a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H10L4 18z"
          fill="var(--color-paan-600)"
        />
        <circle cx="10.5" cy="18" r="2.2" fill="var(--color-haldi-400)" />
        <path
          d="M23.6 21.3a5.4 5.4 0 1 1 .9-5.1h-8.6"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="E-Bazar home" className={`flex items-center gap-1.5 ${className}`}>
      <LogoMark className="size-9 shrink-0" />
      <span className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-paan-800">
        E-Bazar
      </span>
    </Link>
  );
}
