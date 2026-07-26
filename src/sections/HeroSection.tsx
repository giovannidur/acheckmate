import { useEffect, useRef, useState } from 'react';
import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import Marquee from '../components/Marquee';
import FloatingChess from '../components/FloatingChess';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-[10vw] overflow-hidden"
    >
      {/* Animated floating chess pieces */}
      <FloatingChess
        pieces={['♚', '♛', '♜', '♝', '♞', '♟']}
        count={6}
        opacity={0.04}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(188, 0, 0, 0.05), transparent 70%)',
          left: `calc(40% + ${mousePos.x * 80}px)`,
          top: `calc(40% + ${mousePos.y * 80}px)`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 2s ease-out, top 2s ease-out',
        }}
      />

      {/* Subtle line decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[15%] left-[3%] w-[1px] h-[200px] bg-white/[0.04]" />
        <div className="absolute top-[35%] right-[8%] w-[1px] h-[300px] bg-white/[0.04]" />
        <div className="absolute bottom-[20%] left-[20%] w-[120px] h-[1px] bg-white/[0.04]" />
      </div>

      <div className="relative z-10">
        <ScrollReveal delay={200}>
          <span
            className="inline-block text-[11px] tracking-[2px] sm:tracking-[4px] uppercase mb-10 px-5 py-2.5 rounded-full border border-white/10 whitespace-nowrap"
            style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
          >
            // Artistic Affinity
          </span>
        </ScrollReveal>

        <div className="mb-4">
          <LineReveal delay={400}>
            <h1
              className="text-[clamp(3.5rem,14vw,15rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]"
              data-cursor-text="↓"
            >
              ACHECK
            </h1>
          </LineReveal>
        </div>

        <div className="mb-8">
          <LineReveal delay={550}>
            <h1
              className="text-[clamp(3.5rem,14vw,15rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #F5F5F7',
              }}
              data-cursor-text="↓"
            >
              MATE.
            </h1>
          </LineReveal>
        </div>

        <ScrollReveal delay={700}>
          <p className="mt-6 opacity-40 max-w-[500px] leading-[1.8] text-sm md:text-base">
            UGC Creator, Building Architect & Web Developer. Ich verbinde technischen Code mit künstlerischer Leidenschaft.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={900}>
          <div className="mt-14 flex items-center gap-6">
            <ScrollIndicator />
            <span
              className="text-[10px] tracking-[3px] uppercase opacity-30"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Scroll to explore
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <Marquee
          text="ACHECKMATE"
          speed={25}
          className="text-[clamp(1rem,3vw,2rem)] font-black uppercase tracking-[0.1em] opacity-[0.03] py-4"
        />
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <div className="relative w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2">
      <div className="w-[2px] h-2 bg-[#BC0000] rounded-full animate-bounce" style={{ animationDuration: '1.8s' }} />
    </div>
  );
}
