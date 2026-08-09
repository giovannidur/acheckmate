import { useState } from 'react';
import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FloatingChess from '../components/FloatingChess';

const skills = [
  { title: 'UGC Creation', desc: 'Custom Avatar-Accessories, Hats, Faces & Wearables für den Roblox Marketplace.' },
  { title: 'Outfit Design', desc: 'Einzigartige Outfit-Kombinationen und Layered Clothing Designs.' },
  { title: 'Building', desc: 'Architektonische Welten, detaillierte Maps und Environment Design in Roblox Studio.' },
];

export default function RobloxSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section
      id="roblox"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-[10vw] py-32 overflow-hidden"
      style={{ background: '#BC0000' }}
    >
      {/* Floating chess - dark on red */}
      <FloatingChess
        pieces={['♛', '♚', '♜']}
        count={3}
        color="#000000"
        opacity={0.05}
      />

      {/* Grid lines decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-[25%] w-[1px] h-full bg-black/[0.04]" />
        <div className="absolute top-0 left-[50%] w-[1px] h-full bg-black/[0.04]" />
        <div className="absolute top-0 left-[75%] w-[1px] h-full bg-black/[0.04]" />
      </div>

      <div className="relative z-10">
        <ScrollReveal>
          <span
            className="inline-block text-[11px] tracking-[2px] sm:tracking-[4px] uppercase mb-10 px-5 py-2.5 rounded-full border border-black/10 whitespace-nowrap"
            style={{ fontFamily: "'Space Mono', monospace", color: '#000' }}
          >
            // Metaverse Lab
          </span>
        </ScrollReveal>

        <div className="mb-2">
          <LineReveal delay={200}>
            <h1
              className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.9] uppercase tracking-[-0.04em]"
              style={{ color: '#000' }}
            >
              ROBLOX
            </h1>
          </LineReveal>
        </div>

        <LineReveal delay={350}>
          <h2
            className="text-[clamp(1.5rem,4vw,4rem)] font-black leading-[0.9] uppercase tracking-[-0.04em]"
            style={{ color: 'rgba(0,0,0,0.2)' }}
          >
            UNIVERSE
          </h2>
        </LineReveal>

        <ScrollReveal delay={450}>
          <p className="mt-8 opacity-50 max-w-[500px] leading-[1.8] text-sm md:text-base" style={{ color: '#000' }}>
            Meine Arbeit auf der Roblox-Plattform, von UGC Items bis hin zu kompletten Welten.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={550}>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href="https://www.roblox.com/de/users/7939067474/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-5 no-underline group"
              cursorText="Visit"
            >
              <span
                className="text-[clamp(1rem,2.5vw,2rem)] font-black uppercase link-hover"
                style={{ color: '#000' }}
              >
                Profil Besuchen
              </span>
              <span className="w-12 h-12 rounded-full border-2 border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-[#BC0000] transition-all duration-500 text-black text-lg shrink-0">
                ↗
              </span>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Skill cards — sized to own content, no forced stretch */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {skills.map((item, i) => (
            <ScrollReveal key={item.title} delay={700 + i * 120}>
              <div
                className="p-8 md:p-10 rounded-[24px] border transition-all duration-500 flex flex-col"
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                data-interactive
                style={{
                  background: hoveredItem === i ? 'rgba(8, 8, 8, 0.92)' : 'rgba(8, 8, 8, 0.82)',
                  borderColor: hoveredItem === i ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                  transform: hoveredItem === i ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hoveredItem === i
                    ? '0 24px 44px -14px rgba(0, 0, 0, 0.55)'
                    : '0 10px 24px -10px rgba(0, 0, 0, 0.35)',
                }}
              >
                <span
                  className="text-[10px] tracking-[3px] uppercase opacity-80 mb-5 block"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#FF4444' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4" style={{ color: '#F5F5F7' }}>
                  {item.title}
                </h4>
                <p className="text-[13px] opacity-60 leading-[1.7]" style={{ color: '#F5F5F7' }}>
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
