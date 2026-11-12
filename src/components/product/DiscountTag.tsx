import { percentOff } from "@/lib/format";

/** The punched price tag that marks a discount, everywhere in the app. */
export default function DiscountTag({
  price,
  discountPrice,
  className = "",
  tone = "lal",
}: {
  price: number;
  discountPrice?: number | null;
  className?: string;
  tone?: "lal" | "haldi";
}) {
  const off = percentOff(price, discountPrice);
  if (!off) return null;
  const colors = tone === "lal" ? "bg-lal-500 text-white" : "bg-haldi-400 text-haldi-800";
  return (
    <span
      className={`price-tag inline-flex h-6 items-center pr-2 font-display text-[13px] font-bold tabular ${colors} ${className}`}
    >
      -{off}%
    </span>
  );
}
