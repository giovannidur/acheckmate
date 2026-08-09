import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-text], [data-interactive]';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorText, setCursorText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const smoothPos = useRef({ x: -100, y: -100 });
  const ringScale = useRef(0);
  const expandedRef = useRef(false);
  const visibleRef = useRef(false);

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

    // Single source of truth: recompute hover state directly from the
    // element under the cursor on every move. Avoids flicker from
    // separate mouseover/mouseout listeners on nested elements.
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;

      const target = e.target as HTMLElement | null;
      const interactive = target ? target.closest(INTERACTIVE_SELECTOR) : null;

      if (interactive) {
        expandedRef.current = true;
        const text = interactive.getAttribute('data-cursor-text') || '';
        setCursorText((prev) => (prev === text ? prev : text));
      } else {
        expandedRef.current = false;
        setCursorText((prev) => (prev === '' ? prev : ''));
      }
    };

    const handleLeaveWindow = () => {
      visibleRef.current = false;
    };

    const handleEnterWindow = () => {
      visibleRef.current = true;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeaveWindow);
    document.documentElement.addEventListener('mouseenter', handleEnterWindow);

    // Draw a shape twice — thick black underneath, thin white on top.
    // Guarantees contrast against ANY background color, no blend-mode needed.
    const haloCircleStroke = (cx: number, cy: number, r: number, coreWidth: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.lineWidth = coreWidth + 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = coreWidth;
      ctx.stroke();
    };

    const haloCircleFill = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r + 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    };

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visibleRef.current) {
        // Smooth follow for the outer ring only — the dot itself stays 1:1 with the mouse
        smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.22;
        smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.22;

        const mx = mousePos.current.x;
        const my = mousePos.current.y;
        const sx = smoothPos.current.x;
        const sy = smoothPos.current.y;
        const expanded = expandedRef.current;

        const targetScale = expanded ? 1 : 0;
        ringScale.current += (targetScale - ringScale.current) * 0.22;

        // Small solid dot at the exact mouse position — always visible
        const dotRadius = 4 - ringScale.current * 2.5;
        if (dotRadius > 0.5) {
          haloCircleFill(mx, my, dotRadius);
        }

        // Ring that grows around interactive elements
        if (ringScale.current > 0.02) {
          const r = 8 + ringScale.current * 22;
          haloCircleStroke(sx, sy, r, 1.4);
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * ringScale.current})`;
          ctx.fill();
        }

        if (textRef.current) {
          textRef.current.style.left = `${sx}px`;
          textRef.current.style.top = `${sy - 32}px`;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', handleEnterWindow);
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
