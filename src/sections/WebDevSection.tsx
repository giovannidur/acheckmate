import ScrollReveal, { LineReveal } from '../components/ScrollReveal';
import FloatingChess from '../components/FloatingChess';
import { useState, useRef, useEffect } from 'react';

const services = [
  {
    num: '01',
    title: 'Web Design',
    desc: 'Interaktive Webseiten mit modernem Design und flüssigen Animationen.',
  },
  {
    num: '02',
    title: 'Development',
    desc: 'Von Frontend bis Backend, sauberer und performanter Code.',
  },
  {
    num: '03',
    title: 'Creative Code',
    desc: 'Experimentelle Projekte an der Grenze von Kunst und Technologie.',
  },
];

const skills = [
  { name: 'HTML / CSS', level: 95 },
  { name: 'JavaScript', level: 85 },
  { name: 'React', level: 80 },
  { name: 'Web Design', level: 90 },
  { name: 'Animation', level: 85 },
  { name: 'Lua / Scripting', level: 75 },
];

export default function WebDevSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section id="webdev" className="relative min-h-screen flex flex-col justify-center px-6 md:px-[10vw] py-32 overflow-hidden">
      {/* Floating chess pieces */}
      <FloatingChess
        pieces={['♜', '♝']}
        count={2}
        opacity={0.025}
      />

      <div className="relative z-10">
        <ScrollReveal>
          <span
            className="inline-block text-[11px] tracking-[2px] sm:tracking-[4px] uppercase mb-10 px-5 py-2.5 rounded-full border border-white/10 whitespace-nowrap"
            style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
          >
            // Digital Construction
          </span>
        </ScrollReveal>

        <div className="mb-2">
          <LineReveal delay={200}>
            <h1 className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]">
              WEB
            </h1>
          </LineReveal>
        </div>

        <LineReveal delay={350}>
          <h1
            className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] uppercase tracking-[-0.05em]"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px #F5F5F7',
            }}
          >
            DEVELOP.
          </h1>
        </LineReveal>

        <ScrollReveal delay={450}>
          <p className="mt-8 opacity-40 max-w-[500px] leading-[1.8] text-sm md:text-base">
            Von interaktiven Webseiten bis hin zu komplexen Skripten. Ich baue die Architektur des Webs.
          </p>
        </ScrollReveal>

        {/* Services — equal height cards in grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.num} delay={600 + i * 120}>
              <div
                className="h-full p-8 md:p-10 rounded-[24px] border transition-all duration-500 flex flex-col group"
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                data-interactive
                style={{
                  background: hoveredService === i ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  transform: hoveredService === i ? 'translateY(-6px)' : 'translateY(0)',
                  borderColor: hoveredService === i ? 'rgba(188, 0, 0, 0.35)' : 'rgba(255,255,255,0.1)',
                  boxShadow: hoveredService === i
                    ? '0 20px 40px -12px rgba(188, 0, 0, 0.25)'
                    : '0 4px 16px -8px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span
                  className="text-[10px] tracking-[3px] opacity-30 mb-5 block"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
                >
                  {service.num}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-[#BC0000] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[13px] opacity-40 leading-[1.7] mt-auto">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills — clean bar layout */}
        <ScrollReveal delay={1000}>
          <div className="mt-24">
            <span
              className="block text-[10px] tracking-[3px] uppercase mb-10 opacity-30"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Fähigkeiten
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 80} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [inView, setInView] = useState(false);
  const [displayLevel, setDisplayLevel] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || observed.current) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observed.current = true;
        setTimeout(() => setInView(true), delay);
        obs.disconnect();
      }
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!inView) return;
    const end = level;
    const duration = 900;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayLevel(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, level]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-[11px] tracking-[2px] uppercase font-medium" style={{ fontFamily: "'Space Mono', monospace" }}>
          {name}
        </span>
        <span
          className="text-[11px] opacity-40 tabular-nums"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {displayLevel}%
        </span>
      </div>
      <div className="w-full h-[3px] bg-white/[0.06] overflow-hidden rounded-full">
        <div
          className="h-full rounded-full"
          style={{
            width: inView ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, #BC0000, #e03030)',
            transition: `width 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
