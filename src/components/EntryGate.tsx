import { useEffect, useState } from 'react';
import { unlockAudio, playEntrance } from '../utils/sound';

const STATUSES = [
  'gerade wahrscheinlich am coden, oder auch nicht',
  'baut grad was für roblox',
  'irgendwo zwischen zwei projekten',
  'schach nebenbei offen, wie immer',
];

export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [clock, setClock] = useState('');
  const [status] = useState(() => STATUSES[Math.floor(Math.random() * STATUSES.length)]);

  useEffect(() => {
    const update = () => setClock(new Date().toLocaleTimeString('de-DE'));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    unlockAudio();
    playEntrance();
    setLeaving(true);
    setTimeout(onEnter, 750);
  };

  return (
    <div
      onClick={handleEnter}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        background: '#0a0a0c',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.75s ease',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      {/* Sehr gedämpfter, tiefer Glow — kein Neon, eher wie Kerzenlicht */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(120,10,10,0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
          transform: leaving ? 'scale(1.3)' : 'scale(1)',
          opacity: leaving ? 0 : 1,
          transition: 'all 0.9s ease',
        }}
      />

      <div
        className="relative flex flex-col items-center px-6 text-center"
        style={{
          transform: leaving ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.75s ease',
        }}
      >
        {/* Live status — direkt inspiriert von "the dot you see is live" */}
        <div className="flex items-center gap-2 mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
              style={{ background: '#4ADE80' }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: '#4ADE80' }}
            />
          </span>
          <span
            className="text-[9px] tracking-[2px] opacity-35 lowercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {status}
          </span>
        </div>

        <div
          className="text-2xl md:text-4xl font-light tracking-[2px] mb-5 lowercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          acheckmate
        </div>

        <p className="text-[11px] md:text-xs opacity-30 mb-14 max-w-[260px] leading-relaxed lowercase">
          web developer &amp; ugc creator aus deutschland.
        </p>

        <div className="flex items-center gap-3 opacity-50 hover:opacity-90 transition-opacity duration-500">
          <span
            className="text-[9px] tracking-[3px] uppercase"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            klick um einzutreten
          </span>
        </div>
      </div>

      {/* Live-Uhr, im catchii-Format */}
      <div
        className="absolute bottom-8 text-[10px] tracking-[2px] opacity-20 lowercase"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {clock} in deutschland
      </div>
    </div>
  );
}
