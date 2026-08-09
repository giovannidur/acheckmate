import { useState, type ReactElement } from 'react';
import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FloatingChess from '../components/FloatingChess';

// Minimalistische Line-Icons im Brand-Stil (statt generischer Emojis)
const icons: Record<string, ReactElement> = {
  UGC: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="9" rx="4" />
      <path d="M8 12.5h.01M8 10.5v4M6 12.5h4" />
      <circle cx="16" cy="11.5" r="1" />
      <circle cx="18.2" cy="13.5" r="1" />
    </svg>
  ),
  Build: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 11h16" />
    </svg>
  ),
  Code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 4.5 12 9 16" />
      <path d="M15 8l4.5 4-4.5 4" />
    </svg>
  ),
  Design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-4.97 0-9 3.8-9 8.5S6.6 20 10.5 20c.9 0 1.5-.6 1.5-1.4 0-.4-.15-.7-.4-1a1.4 1.4 0 0 1 1-2.4H14c3.3 0 6-2.5 6-6C20 5.6 16.4 3 12 3Z" />
      <circle cx="7.5" cy="10.5" r=".9" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.5" r=".9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
  Create: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M17.5 17.5 15 15M6 18l2.5-2.5M17.5 6.5 15 9" />
    </svg>
  ),
  Ship: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c2.5 2.5 3.5 6 3.5 9.5 0 1.7-.4 3.2-1 4.5h-5c-.6-1.3-1-2.8-1-4.5C8.5 8 9.5 4.5 12 2Z" />
      <path d="M9.5 16 7 21l3-1.5M14.5 16l2.5 5-3-1.5" />
      <circle cx="12" cy="10" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const gridItems = [
  { color: 'linear-gradient(135deg, #BC0000 0%, #800000 100%)', label: 'UGC' },
  { color: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', label: 'Build' },
  { color: 'linear-gradient(135deg, #2a2a2a 0%, #444 100%)', label: 'Code' },
  { color: 'linear-gradient(135deg, #BC0000 0%, #600000 100%)', label: 'Design' },
  { color: 'linear-gradient(135deg, #333 0%, #555 100%)', label: 'Create' },
  { color: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', label: 'Ship' },
];

export default function InstagramSection() {
  const [hoveredGrid, setHoveredGrid] = useState<number | null>(null);

  return (
    <section
      id="instagram"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-[10vw] py-32 overflow-hidden"
      style={{ background: '#F5F5F7', color: '#080808' }}
    >
      {/* Floating chess pieces */}
      <FloatingChess
        pieces={['♟', '♞']}
        count={2}
        color="#000000"
        opacity={0.03}
      />

      {/* Decorative circles */}
      <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] rounded-full border border-black/[0.03] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[300px] h-[300px] rounded-full border border-black/[0.03] pointer-events-none" />

      <div className="relative z-10">
        <ScrollReveal>
          <span
            className="inline-block text-[11px] tracking-[2px] sm:tracking-[4px] uppercase mb-10 px-5 py-2.5 rounded-full border border-black/10 whitespace-nowrap"
            style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
          >
            // Social Gallery
          </span>
        </ScrollReveal>

        <LineReveal delay={200}>
          <h1 className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]" style={{ color: '#080808' }}>
            INSTA
          </h1>
        </LineReveal>

        <LineReveal delay={350}>
          <h1
            className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #080808',
            }}
          >
            GRAM.
          </h1>
        </LineReveal>

        <ScrollReveal delay={500}>
          <p className="mt-10 opacity-40 max-w-[500px] leading-relaxed text-sm md:text-base" style={{ color: '#080808' }}>
            Kreative Einblicke, Behind-the-Scenes und visuelle Inspiration. Folge mir auf Instagram für den vollen Feed.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={650}>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href="https://www.instagram.com/gio0vannii/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-[clamp(1.2rem,3vw,2.5rem)] font-black uppercase no-underline group"
              cursorText="Follow"
              strength={0.4}
            >
              <span style={{ color: '#BC0000' }} className="group-hover:tracking-wider transition-all duration-500">@GIO0VANNII</span>
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2" style={{ color: '#BC0000' }}>↗</span>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Interactive grid */}
        <ScrollReveal delay={800}>
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl">
            {gridItems.map((item, i) => {
              const active = hoveredGrid === i;
              return (
                <div
                  key={i}
                  className="aspect-square rounded-2xl transition-all duration-700 relative overflow-hidden flex flex-col items-center justify-center"
                  data-cursor-text={item.label}
                  data-interactive
                  onMouseEnter={() => setHoveredGrid(i)}
                  onMouseLeave={() => setHoveredGrid(null)}
                  onClick={() => setHoveredGrid(active ? null : i)}
                  style={{
                    background: item.color,
                    transform: active ? 'scale(1.1)' : hoveredGrid !== null ? 'scale(0.95)' : 'scale(1)',
                    opacity: hoveredGrid !== null && !active ? 0.5 : 1,
                    zIndex: active ? 10 : 1,
                    boxShadow: active
                      ? '0 16px 32px -10px rgba(0, 0, 0, 0.5)'
                      : '0 4px 12px -6px rgba(0, 0, 0, 0.25)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    className="text-white/90 transition-transform duration-500"
                    style={{ transform: active ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    {icons[item.label]}
                  </span>

                  {/* Label overlay — driven by real state so it works on tap, not just hover */}
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-3 transition-all duration-500"
                    style={{ background: active ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)' }}
                  >
                    <span
                      className="text-white text-[9px] tracking-[3px] uppercase transition-opacity duration-500"
                      style={{ fontFamily: "'Space Mono', monospace", opacity: active ? 1 : 0 }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
