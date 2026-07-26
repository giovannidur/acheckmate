import { useState, useEffect } from 'react';

interface NavProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavProps) {
  const [clock, setClock] = useState('00:00:00');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString('de-DE'));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const menuItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Roblox', id: 'roblox' },
    { label: 'Web Dev', id: 'webdev' },
    { label: 'Instagram', id: 'instagram' },
    { label: 'Contact', id: 'contact' },
    { label: 'Legal', id: 'legal' },
  ];

  const handleNav = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => onNavigate(id), 300);
  };

  return (
    <>
      {/* Fixed Nav Bar */}
      <nav
        className="fixed top-0 left-0 w-full z-[9500] px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8, 8, 8, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div
          className="font-bold text-[10px] tracking-[3px] uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          ACHECKMATE
        </div>

        <div className="flex items-center gap-8">
          <div
            className="hidden md:block text-[10px] tracking-[2px] uppercase opacity-40"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {clock}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[9600] w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
            data-cursor-text="Menu"
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[1px] bg-current transition-all duration-500"
              style={{
                transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
                background: '#F5F5F7',
              }}
            />
            <span
              className="block w-6 h-[1px] bg-current transition-all duration-500"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
                opacity: menuOpen ? 1 : 1,
                background: '#F5F5F7',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-2 md:gap-4">
          {menuItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="menu-item text-left"
              style={{
                transitionDelay: menuOpen ? `${i * 0.08 + 0.2}s` : '0s',
              }}
              data-cursor-text="Go"
            >
              <span className="inline-block text-[10px] tracking-[3px] opacity-30 mr-4 align-top" style={{ fontFamily: "'Space Mono', monospace" }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-end text-[10px] tracking-[2px] uppercase opacity-30" style={{ fontFamily: "'Space Mono', monospace" }}>
          <div>
            <a href="https://www.instagram.com/gio0vannii/" target="_blank" rel="noopener noreferrer" className="link-hover block mb-2">Instagram</a>
            <a href="mailto:acheckmate100@gmail.com" className="link-hover block">Email</a>
          </div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </div>
    </>
  );
}
