import { useState } from 'react';
import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FloatingChess from '../components/FloatingChess';

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
            {gridItems.map((item, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl transition-all duration-700 relative overflow-hidden group"
                data-cursor-text={item.label}
                data-interactive
                onMouseEnter={() => setHoveredGrid(i)}
                onMouseLeave={() => setHoveredGrid(null)}
                style={{
                  background: item.color,
                  transform: hoveredGrid === i ? 'scale(1.1)' : hoveredGrid !== null ? 'scale(0.95)' : 'scale(1)',
                  opacity: hoveredGrid !== null && hoveredGrid !== i ? 0.5 : 1,
                  zIndex: hoveredGrid === i ? 10 : 1,
                }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white text-[9px] tracking-[3px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
