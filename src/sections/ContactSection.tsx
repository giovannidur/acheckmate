import { useEffect, useRef, useState } from 'react';
import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FloatingChess from '../components/FloatingChess';
import { triggerToast } from '../components/Toast';

export default function ContactSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText('gio0vani').then(() => {
      triggerToast('Discord ID kopiert!');
    }).catch(() => {
      triggerToast('Discord: gio0vani');
    });
  };

  const handleMailClick = () => {
    triggerToast('Mail-App wird geöffnet...');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-6 md:px-[10vw]"
    >
      {/* Floating chess in background */}
      <FloatingChess
        pieces={['♝', '♞', '♜']}
        count={3}
        opacity={0.025}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(188, 0, 0, 0.04), transparent 70%)',
          right: `calc(20% + ${mousePos.x * -40}px)`,
          top: `calc(30% + ${mousePos.y * -40}px)`,
          transition: 'right 2s ease-out, top 2s ease-out',
        }}
      />

      {/* ── Headline ── */}
      <div className="min-h-[55vh] flex flex-col justify-center pt-32 pb-16 relative z-10">
        <ScrollReveal>
          <span
            className="inline-block text-[11px] tracking-[2px] sm:tracking-[4px] uppercase mb-10 px-5 py-2.5 rounded-full border border-white/10 whitespace-nowrap"
            style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
          >
            // Final Move
          </span>
        </ScrollReveal>

        <div className="mb-4">
          <LineReveal delay={200}>
            <h1 className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]">
              LET'S
            </h1>
          </LineReveal>
        </div>

        <LineReveal delay={350}>
          <h1
            className="text-[clamp(3rem,10vw,10rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #F5F5F7',
            }}
          >
            CONNECT.
          </h1>
        </LineReveal>

        <ScrollReveal delay={500}>
          <p className="mt-10 opacity-35 max-w-[550px] leading-[1.8] text-sm md:text-base">
            Bereit für eine Zusammenarbeit? Schreib mir eine Nachricht oder vernetze dich über Discord.
          </p>
        </ScrollReveal>
      </div>

      {/* ── Cards ── */}
      <div className="pb-28 relative z-10">
        <ScrollReveal delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

            {/* Discord Card */}
            <div
              className="rounded-[28px] border border-white/[0.06] transition-all duration-700 hover:border-[#BC0000]/20 group flex flex-col"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
              }}
              data-interactive
            >
              <div className="p-8 md:p-12 flex flex-col flex-1">
                <span
                  className="block text-[10px] tracking-[3px] uppercase mb-6 opacity-40"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
                >
                  Discord
                </span>

                <h2 className="text-3xl md:text-4xl font-black tracking-[-2px] mb-4">
                  gio0vani
                </h2>

                <p className="text-sm opacity-30 mb-10 leading-[1.7] max-w-[320px] flex-1">
                  Schreib mir direkt auf Discord — am schnellsten erreichbar.
                </p>

                <div>
                  <button
                    onClick={handleCopyDiscord}
                    className="bg-white text-[#080808] px-7 py-3.5 rounded-full font-extrabold text-[11px] tracking-[2px] uppercase border-none whitespace-nowrap transition-all duration-300 hover:bg-[#BC0000] hover:text-white hover:scale-[1.03] inline-flex items-center gap-3"
                    data-cursor-text="Copy"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    ID KOPIEREN
                  </button>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div
              className="rounded-[28px] border border-white/[0.06] transition-all duration-700 hover:border-[#BC0000]/20 group flex flex-col"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
              }}
              data-interactive
            >
              <div className="p-8 md:p-12 flex flex-col flex-1">
                <span
                  className="block text-[10px] tracking-[3px] uppercase mb-6 opacity-40"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
                >
                  Email
                </span>

                <h2 className="text-3xl md:text-4xl font-black tracking-[-1px] mb-4">
                  Schreib mir
                </h2>

                <p className="text-sm opacity-30 mb-10 leading-[1.7] max-w-[320px] flex-1">
                  Für Projektanfragen, Kollaborationen oder einfach um Hallo zu sagen.
                </p>

                <div>
                  <a
                    href="mailto:acheckmate100@gmail.com"
                    onClick={handleMailClick}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-extrabold text-[11px] tracking-[2px] uppercase border border-white/20 whitespace-nowrap text-white no-underline transition-all duration-300 hover:bg-white hover:text-[#080808] hover:scale-[1.03]"
                    data-cursor-text="Send"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    MAIL SENDEN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Social links ── */}
      <div className="pb-32 relative z-10">
        <ScrollReveal delay={500}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/gio0vannii/', handle: '@gio0vannii' },
              { label: 'Roblox', href: 'https://www.roblox.com/de/users/7939067474/profile', handle: 'Profil' },
            ].map((link) => (
              <MagneticButton
                key={link.label}
                as="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline text-white"
                cursorText="Open"
                strength={0.3}
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#BC0000]/40 group-hover:bg-[#BC0000]/5 transition-all duration-500 shrink-0">
                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <div>
                    <span className="block text-[10px] tracking-[3px] uppercase opacity-30 mb-1" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {link.label}
                    </span>
                    <span className="block text-lg font-bold group-hover:text-[#BC0000] transition-colors duration-300">
                      {link.handle}
                    </span>
                  </div>
                </div>
              </MagneticButton>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
