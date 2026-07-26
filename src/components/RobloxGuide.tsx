import { useState, useEffect } from 'react';

// Dein Charakter-Bild - liegt lokal in public/avatar.png
// Vorbeschnittene Kopf/Bust-Version für den kleinen Guide-Avatar
const CHARACTER_IMAGE = '/avatar-head.png';

interface GuideMessage {
  section: string;
  message: string;
}

const guideMessages: GuideMessage[] = [
  { section: 'hero', message: 'Checkmate! Willkommen in meinem Reich. Mach mach und scroll mal runter!' },
  { section: 'roblox', message: 'Das ist mein Lab. Hier entstehen die besten UGC Items und Maps.' },
  { section: 'webdev', message: 'Code ist wie Schach — man muss immer drei Züge voraus sein.' },
  { section: 'instagram', message: 'Hier gibt es den visuellen Flex. Folg mir mal!' },
  { section: 'contact', message: 'Dein Zug! Schreib mir, wenn du ein Projekt starten willst.' },
];

export default function RobloxGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(guideMessages[0]);
  const [floatY, setFloatY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  // Show guide after load
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  // Track scroll for messages
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'roblox', 'webdev', 'instagram', 'contact'];
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          
          if (scrollY >= top && scrollY < bottom) {
            const msg = guideMessages.find(m => m.section === sectionId);
            if (msg && msg.section !== currentMessage.section) {
              setCurrentMessage(msg);
            }
            break;
          }
        }
      }

      // Fade out near the very bottom so we don't cover footer links
      const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setNearFooter(distanceFromBottom < 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentMessage]);

  // Floating animation
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.03;
      setFloatY(Math.sin(t) * 10);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[9000] w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 shadow-2xl flex items-center justify-center text-white/70 hover:text-white transition-colors"
        style={{ background: 'rgba(10, 10, 10, 0.98)', backdropFilter: 'blur(20px)' }}
        aria-label="Guide öffnen"
      >
        <span className="text-lg">♚</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 z-[9000] p-2 sm:p-4 md:p-6 max-w-[calc(100vw-1rem)] sm:max-w-[420px] md:max-w-[480px] transition-opacity duration-300"
      style={{
        opacity: nearFooter ? 0 : 1,
        pointerEvents: nearFooter ? 'none' : 'none'
      }}
    >
      <div
        className="flex items-end gap-2 sm:gap-3"
        style={{
          transform: `translateY(${floatY}px)`,
          pointerEvents: nearFooter ? 'none' : 'auto'
        }}
      >
        {/* ── DEIN CHARAKTER — nur Kopf/Oberkörper schaut rein ── */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden rounded-t-xl shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              <span className="text-xl sm:text-2xl">♚</span>
            </div>
          )}
          <img
            src={CHARACTER_IMAGE}
            alt="ACHECKMATE Guide"
            className={`absolute inset-0 w-full h-full object-cover object-center drop-shadow-[0_20px_60px_rgba(188,0,0,0.3)] transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>

        {/* ─ SPRECHBLASE ── */}
        <div className="relative flex-1 min-w-0">
          <div
            className="rounded-2xl rounded-bl-none border border-white/10 shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-3 sm:p-4 pr-8 sm:pr-10 relative">
              <button
                onClick={() => setIsMinimized(true)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/80 transition-colors text-sm"
                aria-label="Guide schließen"
              >
                ✕
              </button>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-[1.5] text-white/90 font-medium">
                {currentMessage.message}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[7px] sm:text-[8px] tracking-[2px] uppercase opacity-40" style={{ fontFamily: "'Space Mono', monospace" }}>
                  // {currentMessage.section}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
