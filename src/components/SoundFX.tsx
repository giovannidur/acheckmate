import { useEffect } from 'react';
import { unlockAudio, playHover, playClick } from '../utils/sound';

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-text], [data-interactive]';

export default function SoundFX() {
  useEffect(() => {
    let lastTarget: Element | null = null;

    const handleFirstInteraction = () => {
      unlockAudio();
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (interactive && interactive !== lastTarget) {
        lastTarget = interactive;
        playHover();
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (interactive === lastTarget) {
        lastTarget = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE_SELECTOR);
      if (interactive) {
        playClick();
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
