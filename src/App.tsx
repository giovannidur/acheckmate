import { useState, useCallback, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import SoundFX from './components/SoundFX';
import GrainOverlay from './components/GrainOverlay';
import Toast from './components/Toast';
import Navigation from './components/Navigation';
import RobloxGuide from './components/RobloxGuide';
import HelpBot from './components/HelpBot';
import HeroSection from './sections/HeroSection';
import RobloxSection from './sections/RobloxSection';
import WebDevSection from './sections/WebDevSection';
import InstagramSection from './sections/InstagramSection';
import ContactSection from './sections/ContactSection';
import LegalFooter from './sections/LegalFooter';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll progress
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  return (
    <div className="relative">
      {/* Loader */}
      <Loader onComplete={handleLoadComplete} />

      {/* Grain Overlay */}
      <GrainOverlay />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Hover/Click sound feedback */}
      <SoundFX />

      {/* Toast Notification */}
      <Toast />

      {/* Progress Bar */}
      {loaded && (
        <div className="progress-wrap">
          <div ref={scrollProgressRef} className="progress-fill" />
        </div>
      )}

      {/* Navigation */}
      {loaded && <Navigation onNavigate={handleNavigate} />}

      {/* Roblox Guide (handles its own state) */}
      {loaded && <RobloxGuide />}

      {/* Help Bot (right side) */}
      {loaded && <HelpBot />}

      {/* Main Content */}
      <main
        className="transition-opacity duration-1000"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        <HeroSection />

        <SectionDivider />

        <RobloxSection />

        <SectionDivider />

        <WebDevSection />

        {/* Gradient transition to light section */}
        <div
          className="h-[150px]"
          style={{ background: 'linear-gradient(to bottom, #080808, #F5F5F7)' }}
        />

        <InstagramSection />

        {/* Gradient transition back to dark */}
        <div
          className="h-[150px]"
          style={{ background: 'linear-gradient(to bottom, #F5F5F7, #080808)' }}
        />

        <ContactSection />

        <LegalFooter />
      </main>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8 bg-[#080808]">
      <div className="w-[1px] h-[120px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}
