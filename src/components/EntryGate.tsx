import { useEffect, useState } from 'react';
import { unlockAudio, playEntrance } from '../utils/sound';

export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [clock, setClock] = useState('');

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
    setTimeout(onEnter, 650);
  };

  return (
    <div
      onClick={handleEnter}
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        background: '#080808',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.65s ease',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      {/* Subtle red glow behind the content */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(188,0,0,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: leaving ? 'scale(1.4)' : 'scale(1)',
          opacity: leaving ? 0 : 1,
          transition: 'all 0.8s ease',
        }}
      />

      <div
        className="relative flex flex-col items-center px-6 text-center"
        style={{
          transform: leaving ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.65s ease',
        }}
      >
        <div
          className="text-[40px] md:text-[52px] mb-6 select-none"
          style={{ fontFamily: 'serif', color: '#BC0000', opacity: 0.85 }}
        >
          ♚
        </div>

        <div
          className="text-xl md:text-3xl font-black uppercase tracking-[4px] md:tracking-[6px] mb-4"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          ACHECKMATE
        </div>

        <p className="text-xs md:text-sm opacity-40 mb-12 max-w-[280px] leading-relaxed">
          Web Developer &amp; UGC Creator aus Deutschland.
        </p>

        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: '#BC0000' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: '#BC0000' }}
            />
          </span>
          <span
            className="text-[10px] tracking-[3px] uppercase opacity-60"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Klick um einzutreten
          </span>
        </div>
      </div>

      {/* Live clock, bottom */}
      <div
        className="absolute bottom-8 text-[10px] tracking-[2px] opacity-25"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {clock} // DE
      </div>
    </div>
  );
}
