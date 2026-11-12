"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BatteryCharging,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Headphones,
  LampDesk,
  Shirt,
  Watch,
  type LucideIcon,
} from "lucide-react";
import type { Banner, BannerArt } from "@/lib/content";

const art: Record<BannerArt, LucideIcon[]> = {
  fashion: [Shirt, Shirt, Shirt],
  gadgets: [Headphones, Watch, BatteryCharging],
  home: [Coffee, LampDesk, BedDouble],
};

function Art({ kind, theme }: { kind: BannerArt; theme: Banner["theme"] }) {
  const [A, B, C] = art[kind];
  return (
    <div aria-hidden className="relative h-full w-full">
      <span
        className="absolute right-[6%] top-1/2 aspect-square w-[78%] -translate-y-1/2 rounded-full"
        style={{ background: theme.disc }}
      />
      <span
        className="absolute right-[30%] top-[16%] grid aspect-square w-[44%] place-items-center rounded-[28%] bg-white shadow-lift"
        style={{ color: theme.bg }}
      >
        <A className="h-1/2 w-1/2" strokeWidth={1.3} />
      </span>
      <span
        className="absolute right-[6%] top-[42%] grid aspect-square w-[32%] place-items-center rounded-[28%] bg-white shadow-lift"
        style={{ color: theme.bg }}
      >
        <B className="h-1/2 w-1/2" strokeWidth={1.4} />
      </span>
      <span
        className="absolute bottom-[8%] right-[44%] grid aspect-square w-[24%] place-items-center rounded-[28%] bg-white shadow-lift"
        style={{ color: theme.bg }}
      >
        <C className="h-1/2 w-1/2" strokeWidth={1.5} />
      </span>
    </div>
  );
}

export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = el.children.length;
    const next = (i + n) % n;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, []);

  // Keep the dots in sync with swipes and button presses.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance, unless the person is interacting or prefers less motion.
  useEffect(() => {
    if (paused || banners.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(index + 1), 5500);
    return () => window.clearTimeout(id);
  }, [index, paused, go, banners.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Offers"
      className="group relative overflow-hidden rounded-panel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {banners.map((b, i) => (
          <div
            key={b.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${banners.length}`}
            className="relative grid w-full shrink-0 snap-start grid-cols-[1.7fr_1fr] sm:grid-cols-[1.25fr_1fr] items-center overflow-hidden"
            style={{ background: b.theme.bg, color: b.theme.fg }}
          >
            <div className="relative z-10 py-7 pl-5 pr-2 sm:py-10 sm:pl-8 lg:py-12 lg:pl-11">
              <h2 className="max-w-[13ch] font-display text-[26px] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-4xl lg:text-[46px]">
                {b.title}
              </h2>
              <p
                className="mt-2.5 max-w-[34ch] text-[13.5px] leading-snug sm:mt-3 sm:text-base"
                style={{ color: b.theme.sub }}
              >
                {b.body}
              </p>
              <Link
                href={b.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-4 inline-flex h-10 items-center whitespace-nowrap rounded-full px-5 text-sm font-bold sm:mt-6 sm:h-11 sm:px-6"
                style={{ background: b.theme.button, color: b.theme.buttonText }}
              >
                {b.cta}
              </Link>
            </div>
            <div className="h-full min-h-44 sm:min-h-64">
              <Art kind={b.art} theme={b.theme} />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-5 flex gap-1.5 sm:left-8 lg:left-11">
        {banners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Show offer ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6" : "w-1.5 opacity-45"}`}
            style={{ background: banners[index]?.theme.fg ?? "#fff" }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 right-3 hidden gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 md:flex">
        <button
          type="button"
          aria-label="Previous offer"
          onClick={() => go(index - 1)}
          className="grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-lift hover:bg-white"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next offer"
          onClick={() => go(index + 1)}
          className="grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-lift hover:bg-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
