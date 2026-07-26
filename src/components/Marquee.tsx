interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Marquee({ text, speed = 20, className = '' }: MarqueeProps) {
  const items = Array(8).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {items.map((t, i) => (
          <span key={i} className="mx-8 inline-block">
            {t}
            <span className="mx-8 opacity-30">✦</span>
          </span>
        ))}
        {items.map((t, i) => (
          <span key={`dup-${i}`} className="mx-8 inline-block">
            {t}
            <span className="mx-8 opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
