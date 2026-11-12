import { HandCoins, ShieldCheck, Store, Truck } from "lucide-react";

const points = [
  { icon: HandCoins, title: "Cash on Delivery", body: "Pay when your parcel reaches you." },
  { icon: Truck, title: "Track every order", body: "From packed to your door, step by step." },
  { icon: ShieldCheck, title: "Secure online payment", body: "bKash, Nagad and cards." },
  { icon: Store, title: "Approved sellers", body: "Every shop is checked by E-Bazar." },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why shop on E-Bazar" className="rounded-panel bg-white ring-1 ring-line">
      <ul className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
        {points.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-start gap-3 p-4 md:p-5">
            <Icon className="mt-0.5 size-6 shrink-0 text-paan-600" strokeWidth={1.8} />
            <div>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-ink-3">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
