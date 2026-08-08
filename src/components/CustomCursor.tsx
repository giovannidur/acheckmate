import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorText, setCursorText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);
  const expandedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.current.length > 24) trail.current.shift();
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-text], [data-interactive]');
      if (interactive) {
        expandedRef.current = true;
        const text = interactive.getAttribute('data-cursor-text') || '';
        setCursorText(text);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-text], [data-interactive]');
      if (interactive) {
        expandedRef.current = false;
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.15;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const sx = smoothPos.current.x;
      const sy = smoothPos.current.y;
      const expanded = expandedRef.current;

      // Age trail points
      trail.current.forEach(p => p.age++);
      trail.current = trail.current.filter(p => p.age < 30);

      // Draw trail
      if (trail.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trail.current[0].x, trail.current[0].y);
        for (let i = 1; i < trail.current.length; i++) {
          const p = trail.current[i];
          ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(255, 45, 45, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Subtle glow so the cursor pops on both dark and light sections
      ctx.shadowColor = 'rgba(255, 45, 45, 0.9)';
      ctx.shadowBlur = 6;

      // Center crosshair (at mouse position - instant)
      const crossSize = expanded ? 0 : 10;
      ctx.strokeStyle = expanded ? 'rgba(255, 45, 45, 0)' : 'rgba(255, 45, 45, 0.95)';
      ctx.lineWidth = 1.5;

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(mx - crossSize, my);
      ctx.lineTo(mx - 3, my);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mx + 3, my);
      ctx.lineTo(mx + crossSize, my);
      ctx.stroke();

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(mx, my - crossSize);
      ctx.lineTo(mx, my - 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mx, my + 3);
      ctx.lineTo(mx, my + crossSize);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(mx, my, expanded ? 0 : 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 45, 45, 1)';
      ctx.fill();

      // Outer ring (follows with lag)
      const ringRadius = expanded ? 35 : 20;
      ctx.beginPath();
      ctx.arc(sx, sy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = expanded ? 'rgba(255, 45, 45, 0.5)' : 'rgba(255, 45, 45, 0.3)';
      ctx.lineWidth = expanded ? 1.5 : 1;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Expanded fill
      if (expanded) {
        ctx.beginPath();
        ctx.arc(sx, sy, 35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 45, 45, 0.08)';
        ctx.fill();
      }

      // Update text position
      if (textRef.current) {
        textRef.current.style.left = `${sx}px`;
        textRef.current.style.top = `${sy}px`;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[10000] pointer-events-none hidden md:block"
      />
      <div
        ref={textRef}
        className={`cursor-text hidden md:block ${cursorText ? 'visible' : ''}`}
      >
        {cursorText}
      </div>
    </>
  );
}
