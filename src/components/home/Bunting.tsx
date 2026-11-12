/**
  A string of bazar bunting flags, the kind hung across market lanes for Eid
  and Pohela Boishakh. Used once, on the Flash Sale panel.
*/
export default function Bunting({ className = "" }: { className?: string }) {
  const colors = ["#0b6e4f", "#e0412f", "#ffffff", "#16231e"];
  const flags = Array.from({ length: 40 }, (_, i) => i);
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 800 26"
      preserveAspectRatio="xMidYMin slice"
    >
      <path d="M0 3 Q400 9 800 3" fill="none" stroke="#6b4a00" strokeWidth="1.2" opacity=".5" />
      {flags.map((i) => {
        const x = i * 20 + 2;
        const sag = 3 + Math.sin((i / 39) * Math.PI) * 6 * 0.5;
        return (
          <path
            key={i}
            d={`M${x} ${sag} L${x + 16} ${sag} L${x + 8} ${sag + 17} Z`}
            fill={colors[i % colors.length]}
          />
        );
      })}
    </svg>
  );
}
