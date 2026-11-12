"use client";

import { useSyncExternalStore } from "react";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const DHAKA_OFFSET = 6 * HOUR; // Bangladesh is UTC+6 all year, no daylight saving

/** The next midnight in Dhaka. Day 3 replaces this with FlashSale.endsAt from the database. */
export function nextDhakaMidnight(now: number) {
  return Math.ceil((now + DHAKA_OFFSET + 1) / DAY) * DAY - DHAKA_OFFSET;
}

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
  endsAt,
  size = "md",
  label = "Ends in",
  tone = "dark",
}: {
  /** epoch ms; defaults to tonight's midnight in Dhaka */
  endsAt?: number;
  size?: "sm" | "md";
  label?: string;
  /** "light" for use on dark panels */
  tone?: "dark" | "light";
}) {
  const second = useSyncExternalStore(subscribe, getSecond, getServerSecond);

  let parts: string[] = ["--", "--", "--"];
  let spoken = "";
  if (second !== null) {
    const now = second * 1000;
    const left = Math.max(0, (endsAt ?? nextDhakaMidnight(now)) - now);
    const h = Math.floor(left / HOUR);
    const m = Math.floor((left % HOUR) / 60_000);
    const s = Math.floor((left % 60_000) / 1000);
    parts = [pad(h), pad(m), pad(s)];
    spoken = `${h} hours ${m} minutes`;
  }

  const box =
    size === "md"
      ? "min-w-9 h-9 text-lg rounded-lg px-1.5"
      : "min-w-7 h-7 text-[15px] rounded-md px-1";

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="sr-only">{spoken}</span>
      <span aria-hidden className="flex items-center gap-1">
        {parts.map((p, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="font-display font-bold">:</span>}
            <span
              className={`grid place-items-center font-display font-bold tabular text-white ${tone === "dark" ? "bg-ink" : "bg-white/15"} ${box}`}
            >
              {p}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
