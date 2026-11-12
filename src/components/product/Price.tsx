import { percentOff, taka } from "@/lib/format";

type Props = {
  price: number;
  discountPrice?: number | null;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { now: "text-[15px]", was: "text-xs" },
  md: { now: "text-lg", was: "text-sm" },
  lg: { now: "text-[32px] leading-none", was: "text-base" },
};

export default function Price({ price, discountPrice, size = "sm" }: Props) {
  const off = percentOff(price, discountPrice);
  const now = off ? discountPrice! : price;
  const s = sizes[size];

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`font-display font-bold tabular text-ink ${s.now}`}>{taka(now)}</span>
      {off > 0 && (
        <span className={`tabular text-ink-3 line-through decoration-ink-3/60 ${s.was}`}>
          <span className="sr-only">was </span>
          {taka(price)}
        </span>
      )}
    </div>
  );
}
