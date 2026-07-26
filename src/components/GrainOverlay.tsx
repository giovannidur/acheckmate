import { useEffect, useRef } from 'react';

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const idata = ctx.createImageData(canvas.width, canvas.height);
    const buffer32 = new Uint32Array(idata.data.buffer);

    let animId: number;
    const loop = () => {
      for (let i = 0; i < buffer32.length; i++) {
        if (Math.random() < 0.08) {
          buffer32[i] = (Math.random() * 255) << 24;
        }
      }
      ctx.putImageData(idata, 0, 0);
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="grain-canvas" />;
}
