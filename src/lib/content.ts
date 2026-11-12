/*
  Home page banners and promos. Hardcoded for now; the admin "Manage banners"
  screen (Day 16) moves them into the Banner table.
*/

export type BannerArt = "fashion" | "gadgets" | "home";

export type Banner = {
  id: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  art: BannerArt;
  theme: { bg: string; fg: string; sub: string; button: string; buttonText: string; disc: string };
};

export const banners: Banner[] = [
  {
    id: "winter-panjabi",
    title: "The winter panjabi edit",
    body: "Cotton panjabi, polo shirts and denim, from ৳650.",
    cta: "Shop men's fashion",
    href: "/c/men",
    art: "fashion",
    theme: {
      bg: "#07583f",
      fg: "#ffffff",
      sub: "#d2eadd",
      button: "#f6bf1c",
      buttonText: "#3d2a00",
      disc: "#0b6e4f",
    },
  },
  {
    id: "gadgets",
    title: "Gadgets for less",
    body: "Earbuds, smart watches and fast chargers, up to 19% off.",
    cta: "Shop electronics",
    href: "/c/electronics",
    art: "gadgets",
    theme: {
      bg: "#1f3b5e",
      fg: "#ffffff",
      sub: "#cbd9ea",
      button: "#ffffff",
      buttonText: "#1f3b5e",
      disc: "#2c4f7a",
    },
  },
  {
    id: "cosy-home",
    title: "Warm up your home",
    body: "Kettles, desk lamps and bed sheets, from ৳780.",
    cta: "Shop home and living",
    href: "/c/home-and-living",
    art: "home",
    theme: {
      bg: "#f6bf1c",
      fg: "#2b1d00",
      sub: "#5c4100",
      button: "#16231e",
      buttonText: "#ffffff",
      disc: "#fbd25a",
    },
  },
];

export const featuredCoupon = {
  code: "WELCOME10",
  title: "10% off your order",
  body: "On orders over ৳500. Apply it at checkout.",
};
