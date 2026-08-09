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

// Atmosphärischer Willkommens-Klang beim Betreten der Seite.
// Mehrere leicht verstimmte Oszillatoren pro Note (Chorus-Effekt) für einen
// weichen, glockenartigen Klangkörper statt eines simplen Pieptons —
// dazu ein leiser tiefer Pad-Ton als Fundament.
export function playEntrance() {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state === 'suspended') return;
  const now = audioCtx.currentTime;

  // Tiefer Pad-Ton als atmosphärisches Fundament
  const padOsc = audioCtx.createOscillator();
  const padGain = audioCtx.createGain();
  padOsc.type = 'sine';
  padOsc.frequency.setValueAtTime(110, now);
  const padFilter = audioCtx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 800;
  padGain.gain.setValueAtTime(0.0001, now);
  padGain.gain.exponentialRampToValueAtTime(0.025, now + 0.5);
  padGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  padOsc.connect(padFilter);
  padFilter.connect(padGain);
  padGain.connect(audioCtx.destination);
  padOsc.start(now);
  padOsc.stop(now + 2.3);

  // Glockenartige Akkord-Töne, leicht verstimmt für Schimmer
  const notes = [330, 415, 495, 660];
  notes.forEach((freq, i) => {
    const delay = i * 0.09;
    [0, 4, -3].forEach((detune) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      osc.detune.setValueAtTime(detune, now + delay);
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2600;
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.035, now + delay + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 1.5);
    });
  });
}
