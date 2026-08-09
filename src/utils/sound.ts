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

interface ToneOptions {
  freq: number;
  endFreq?: number;
  duration: number;
  volume: number;
  attack?: number;
  type?: OscillatorType;
  filterFreq?: number;
}

function playTone({ freq, endFreq, duration, volume, attack = 0.02, type = 'sine', filterFreq }: ToneOptions) {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (endFreq && endFreq !== freq) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
  }

  // Sanfter Attack statt hartem Einsatz, dann weiches Ausklingen
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  let node: AudioNode = osc;
  if (filterFreq) {
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.6;
    osc.connect(filter);
    node = filter;
  }
  node.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.03);
}

// Sehr dezenter, weicher Hover-Ton (tiefere Tonhöhe, sanfter Fade statt Klick)
export function playHover() {
  playTone({ freq: 720, endFreq: 600, duration: 0.1, volume: 0.018, attack: 0.02, filterFreq: 2800 });
}

// Weicher "Pop" für Klicks, leichter Pitch-Glide statt zwei harten Einzeltönen
export function playClick() {
  playTone({ freq: 480, endFreq: 700, duration: 0.13, volume: 0.03, attack: 0.015, filterFreq: 3600 });
}
