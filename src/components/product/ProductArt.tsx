import { createElement } from "react";
import {
  BatteryCharging,
  BedDouble,
  BookOpen,
  Cable,
  Coffee,
  Droplets,
  Flower2,
  Handbag,
  Headphones,
  LampDesk,
  NotebookPen,
  Package,
  PlugZap,
  Ribbon,
  Shirt,
  Smartphone,
  Speaker,
  Sun,
  Watch,
  type LucideIcon,
} from "lucide-react";

/*
  Until sellers upload real photos (Day 3 adds ProductImage, Day 13 the
  upload form), each product gets an illustrated tile: a tint for its
  department and an icon for what it is. When imageUrl is set, the photo wins.
*/

type Palette = { bg: string; ring: string; fg: string };

const palettes: Record<string, Palette> = {
  electronics: { bg: "#e4ecf5", ring: "#cbd9ea", fg: "#23446b" },
  fashion: { bg: "#eee8f6", ring: "#dccfee", fg: "#553a80" },
  women: { bg: "#fbe7ee", ring: "#f3cbda", fg: "#93284f" },
  "home-and-living": { bg: "#fbefde", ring: "#f1dab7", fg: "#7f4e19" },
  beauty: { bg: "#fce9e3", ring: "#f5ccbf", fg: "#9a3e2a" },
  books: { bg: "#e5f1ea", ring: "#c7e1d2", fg: "#1e5a41" },
};

const fallbackPalette: Palette = { bg: "#eaf5ef", ring: "#d2eadd", fg: "#07583f" };

const iconRules: [RegExp, LucideIcon][] = [
  [/earbud|headphone/, Headphones],
  [/speaker/, Speaker],
  [/watch/, Watch],
  [/power-bank/, BatteryCharging],
  [/case|phone/, Smartphone],
  [/charger/, PlugZap],
  [/cable/, Cable],
  [/saree/, Flower2],
  [/salwar|kameez/, Handbag],
  [/scarf/, Ribbon],
  [/panjabi|shirt|polo|jeans|denim/, Shirt],
  [/kettle/, Coffee],
  [/bed|sheet/, BedDouble],
  [/lamp/, LampDesk],
  [/face-wash|wash/, Droplets],
  [/sunscreen|spf/, Sun],
  [/notebook/, NotebookPen],
  [/book/, BookOpen],
];

export function paletteFor(categorySlug: string, parentSlug?: string | null) {
  return palettes[categorySlug] ?? (parentSlug ? palettes[parentSlug] : undefined) ?? fallbackPalette;
}

export function iconFor(slug: string): LucideIcon {
  return iconRules.find(([re]) => re.test(slug))?.[1] ?? Package;
}

type Props = {
  name: string;
  slug: string;
  imageUrl?: string | null;
  categorySlug: string;
  parentSlug?: string | null;
  className?: string;
  /** Icon size relative to the tile, as a CSS length */
  iconSize?: string;
};

export default function ProductArt({
  name,
  slug,
  imageUrl,
  categorySlug,
  parentSlug,
  className = "",
  iconSize = "38%",
}: Props) {
  if (imageUrl) {
    return (
      // Plain <img> keeps seller-provided URLs working without remotePatterns config.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className={`aspect-square w-full object-cover ${className}`}
      />
    );
  }

  const p = paletteFor(categorySlug, parentSlug);

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative grid aspect-square w-full place-items-center overflow-hidden ${className}`}
      style={{ background: p.bg }}
    >
      <span
        aria-hidden
        className="absolute aspect-square w-[68%] rounded-full"
        style={{ background: p.ring }}
      />
      <span
        aria-hidden
        className="absolute bottom-[17%] h-[5%] w-[34%] rounded-[50%] opacity-25 blur-[3px]"
        style={{ background: p.fg }}
      />
      {createElement(iconFor(slug), {
        "aria-hidden": true,
        strokeWidth: 1.35,
        className: "relative -translate-y-[4%]",
        style: { color: p.fg, width: iconSize, height: iconSize },
      })}
    </div>
  );
}
