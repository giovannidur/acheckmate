import { useEffect, useState, useRef } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 8 + 1;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase('reveal'), 300);
        setTimeout(() => {
          setPhase('done');
          setTimeout(onComplete, 700);
        }, 1200);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Scramble effect on the brand name
  const brandText = 'ACHECKMATE';
  const [scrambled, setScrambled] = useState(brandText);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_/\\|';
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(
        brandText.split('').map((_, i) => {
          if (i < iteration) return brandText[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration += 0.4;
      if (iteration >= brandText.length) {
        clearInterval(interval);
        setScrambled(brandText);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        background: '#080808',
        opacity: phase === 'done' ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: phase === 'done' ? 'none' : 'all',
      }}
    >
      {/* Center content */}
      <div className="relative flex flex-col items-center">
        {/* Chess piece that scales up on reveal */}
        <div
          className="text-[80px] md:text-[120px] mb-8 transition-all duration-1000 select-none"
          style={{
            fontFamily: 'serif',
            color: '#BC0000',
            opacity: phase === 'reveal' ? 0.15 : 0.06,
            transform: phase === 'reveal' ? 'scale(3) translateY(-20px)' : 'scale(1)',
            filter: phase === 'reveal' ? 'blur(8px)' : 'blur(0px)',
          }}
        >
          ♚
        </div>

        {/* Brand name with scramble */}
        <div
          className="text-sm md:text-base font-bold tracking-[8px] uppercase mb-10 transition-all duration-700"
          style={{
            fontFamily: "'Space Mono', monospace",
            opacity: phase === 'reveal' ? 0 : 0.7,
            transform: phase === 'reveal' ? 'translateY(-20px)' : 'translateY(0)',
            letterSpacing: '8px',
          }}
        >
          {scrambled}
        </div>

        {/* Progress number — big and cinematic */}
        <div
          ref={counterRef}
          className="transition-all duration-700"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 700,
            letterSpacing: '-2px',
            color: phase === 'reveal' ? '#BC0000' : 'rgba(245, 245, 247, 0.08)',
            opacity: phase === 'reveal' ? 0 : 1,
            transform: phase === 'reveal' ? 'scale(1.5)' : 'scale(1)',
            lineHeight: 1,
          }}
        >
          {String(progress).padStart(3, '0')}
        </div>

        {/* Horizontal progress line */}
        <div
          className="mt-8 h-[1px] overflow-hidden transition-all duration-700"
          style={{
            width: phase === 'reveal' ? '0px' : '200px',
            opacity: phase === 'reveal' ? 0 : 1,
          }}
        >
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, transparent, #BC0000)',
            }}
          />
        </div>
      </div>

      {/* Reveal wipe — two panels that slide apart */}
      <div
        className="absolute inset-0 flex pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-1/2 h-full transition-transform duration-700 ease-in-out"
          style={{
            background: '#080808',
            transform: phase === 'reveal' ? 'translateX(-100%)' : 'translateX(0)',
            transitionDelay: '0.3s',
          }}
        />
        <div
          className="w-1/2 h-full transition-transform duration-700 ease-in-out"
          style={{
            background: '#080808',
            transform: phase === 'reveal' ? 'translateX(100%)' : 'translateX(0)',
            transitionDelay: '0.3s',
          }}
        />
      </div>
    </div>
  );
}
