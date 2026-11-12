"use client";

import { useState } from "react";
import { Check, Copy, TicketPercent } from "lucide-react";

export default function CouponCard({
  code,
  title,
  body,
  className = "",
  stacked = false,
}: {
  stacked?: boolean;
  code: string;
  title: string;
  body: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (http, iframes). The code is visible to type instead.
    }
  }

  return (
    <div
      className={`relative flex gap-3 rounded-panel border-2 border-dashed border-paan-200 bg-white p-4 ${
        stacked ? "flex-wrap items-start" : "items-center"
      } ${className}`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paan-50 text-paan-700">
        <TicketPercent className="size-6" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-bold leading-tight text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-ink-2">{body}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={`flex shrink-0 items-center rounded-xl bg-paan-600 px-3 py-1.5 text-white hover:bg-paan-700 ${
          stacked ? "w-full justify-between" : "flex-col"
        }`}
      >
        <span className="font-display text-sm font-bold tracking-wide">{code}</span>
        <span className="flex items-center gap-1 text-[11px] text-paan-100" aria-live="polite">
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy code"}
        </span>
      </button>
    </div>
  );
}
