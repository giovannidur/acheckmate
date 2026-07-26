import { useEffect, useRef } from 'react';

interface FloatingChessProps {
  pieces?: string[];
  count?: number;
  color?: string;
  opacity?: number;
}

export default function FloatingChess({
  pieces = ['♚', '♛', '♜', '♝', '♞', '♟'],
  count = 6,
  color = '#F5F5F7',
  opacity = 0.03,
}: FloatingChessProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLDivElement>('.chess-float');
    const speeds: { x: number; y: number; rot: number; baseX: number; baseY: number; phase: number }[] = [];

    items.forEach(() => {
      speeds.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.2,
        rot: (Math.random() - 0.5) * 0.15,
        baseX: 0,
        baseY: 0,
        phase: Math.random() * Math.PI * 2,
      });
    });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    let t = 0;
    let animId: number;
    const animate = () => {
      t += 0.008;
      items.forEach((el, i) => {
        const s = speeds[i];
        const floatX = Math.sin(t * s.x * 5 + s.phase) * 40;
        const floatY = Math.cos(t * s.y * 5 + s.phase) * 30;
        const rotate = Math.sin(t * s.rot * 3 + s.phase) * 15;

        // Parallax from mouse
        const parallaxX = mouseX * (15 + i * 5);
        const parallaxY = mouseY * (10 + i * 3);

        el.style.transform = `translate(${floatX + parallaxX}px, ${floatY + parallaxY}px) rotate(${rotate}deg)`;
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  const positions = [
    { top: '8%', left: '85%', size: 'clamp(3rem, 8vw, 8rem)' },
    { top: '65%', left: '5%', size: 'clamp(2rem, 6vw, 6rem)' },
    { top: '20%', left: '10%', size: 'clamp(1.5rem, 4vw, 4rem)' },
    { top: '75%', left: '80%', size: 'clamp(2.5rem, 7vw, 7rem)' },
    { top: '40%', left: '90%', size: 'clamp(1.5rem, 3vw, 3rem)' },
    { top: '50%', left: '45%', size: 'clamp(4rem, 12vw, 12rem)' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array(count).fill(0).map((_, i) => {
        const pos = positions[i % positions.length];
        return (
          <div
            key={i}
            className="chess-float absolute select-none transition-none"
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: pos.size,
              color,
              opacity,
              fontFamily: 'serif',
              willChange: 'transform',
            }}
          >
            {pieces[i % pieces.length]}
          </div>
        );
      })}
    </div>
  );
}
