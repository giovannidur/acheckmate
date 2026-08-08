// Leichte, synthetisierte UI-Sounds über die Web Audio API.
// Keine externen Audiodateien nötig, funktioniert offline und ist winzig.

let ctx: AudioContext | null = null;
let unlocked = false;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  return ctx;
}

// Browser blockieren Audio bis zur ersten Nutzerinteraktion.
export function unlockAudio() {
  if (unlocked) return;
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  unlocked = true;
}

function tone(freq: number, duration: number, volume: number, type: OscillatorType = 'sine') {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// Dezenter Hover-Klick
export function playHover() {
  tone(1400, 0.045, 0.035, 'sine');
}

// Etwas satterer Klick-Sound für Buttons/Links
export function playClick() {
  tone(900, 0.07, 0.05, 'sine');
  setTimeout(() => tone(1500, 0.05, 0.03, 'sine'), 15);
}
