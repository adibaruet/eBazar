"use client";

import { useRef } from "react";
import { SlidersHorizontal, X } from "lucide-react";

/** Mobile filters in a bottom sheet, built on the native <dialog> element. */
export default function FilterSheet({ children, count }: { children: React.ReactNode; count: number }) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-ink ring-1 ring-line lg:hidden"
      >
        <SlidersHorizontal className="size-4" />
        Filters
        {count > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-paan-600 text-[11px] font-bold text-white">
            {count}
          </span>
        )}
      </button>
      <dialog
        ref={ref}
        aria-label="Filters"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-0 mt-auto max-h-[85vh] w-full max-w-none rounded-t-[22px] bg-canvas p-0 backdrop:bg-ink/40"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-canvas px-4 py-3">
          <h2 className="font-display text-lg font-bold">Filters</h2>
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => ref.current?.close()}
            className="grid size-9 place-items-center rounded-full hover:bg-white"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-6 p-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">{children}</div>
      </dialog>
    </>
  );
}
