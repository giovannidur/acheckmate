import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Marquee from '../components/Marquee';
import MagneticButton from '../components/MagneticButton';

type LegalPage = 'none' | 'privacy' | 'terms' | 'impressum';

export default function LegalFooter() {
  const [activePage, setActivePage] = useState<LegalPage>('none');

  return (
    <>
      {/* Legal Modal */}
      {activePage !== 'none' && (
        <LegalModal page={activePage} onClose={() => setActivePage('none')} />
      )}

      {/* Divider Marquee */}
      <div className="border-t border-white/5">
        <Marquee
          text="ACHECKMATE // ARCHITECT // UGC CREATOR // WEB DEVELOPER"
          speed={30}
          className="text-[11px] font-bold uppercase tracking-[4px] opacity-[0.06] py-6"
        />
      </div>

      {/* Footer */}
      <footer id="legal" className="relative px-6 md:px-[10vw] py-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-4">
                ACHECKMATE
              </h3>
              <p className="text-[12px] leading-relaxed opacity-30 max-w-[250px]">
                UGC Creator, Building Architect & Web Developer. Kreativität trifft Präzision.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] tracking-[2px] uppercase opacity-30" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Available
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={100}>
            <div>
              <h4
                className="text-[10px] tracking-[3px] uppercase mb-6 opacity-50"
                style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
              >
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'Roblox', href: '#roblox' },
                  { label: 'Web Dev', href: '#webdev' },
                  { label: 'Instagram', href: '#instagram' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[12px] opacity-40 hover:opacity-100 hover:text-[#BC0000] transition-all duration-300 link-hover no-underline text-white inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-[#BC0000] transition-all duration-300" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal delay={200}>
            <div>
              <h4
                className="text-[10px] tracking-[3px] uppercase mb-6 opacity-50"
                style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
              >
                Social
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.instagram.com/gio0vannii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] opacity-40 hover:opacity-100 hover:text-[#BC0000] transition-all duration-300 link-hover no-underline text-white inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#BC0000] transition-all duration-300" />
                    Instagram
                    <span className="opacity-0 group-hover:opacity-60 transition-opacity text-[9px]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/de/users/7939067474/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] opacity-40 hover:opacity-100 hover:text-[#BC0000] transition-all duration-300 link-hover no-underline text-white inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#BC0000] transition-all duration-300" />
                    Roblox
                    <span className="opacity-0 group-hover:opacity-60 transition-opacity text-[9px]">↗</span>
                  </a>
                </li>
                <li>
                  <span className="text-[12px] opacity-30 inline-flex items-center gap-2">
                    Discord: gio0vani
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Legal Links */}
          <ScrollReveal delay={300}>
            <div>
              <h4
                className="text-[10px] tracking-[3px] uppercase mb-6 opacity-50"
                style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
              >
                Legal
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Datenschutz', page: 'privacy' as LegalPage },
                  { label: 'Nutzungsbedingungen', page: 'terms' as LegalPage },
                  { label: 'Impressum', page: 'impressum' as LegalPage },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setActivePage(item.page)}
                      className="text-[12px] opacity-40 hover:opacity-100 hover:text-[#BC0000] transition-all duration-300 link-hover bg-transparent border-none text-white p-0 inline-flex items-center gap-2 group"
                      data-cursor-text="Read"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-[#BC0000] transition-all duration-300" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <ScrollReveal delay={400}>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span className="text-[10px] tracking-[2px] uppercase opacity-20" style={{ fontFamily: "'Space Mono', monospace" }}>
              © {new Date().getFullYear()} ACHECKMATE. Alle Rechte vorbehalten.
            </span>
            <MagneticButton
              className="text-[10px] tracking-[2px] uppercase opacity-20 hover:opacity-60 transition-opacity bg-transparent border-none text-white p-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              cursorText="Top"
              strength={0.3}
            >
              ↑ Nach oben
            </MagneticButton>
          </div>
        </ScrollReveal>
      </footer>
    </>
  );
}

function LegalModal({ page, onClose }: { page: LegalPage; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const content = legalContent[page as keyof typeof legalContent];

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[9800] flex items-center justify-center p-4 md:p-8 transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[24px] border border-white/10 p-8 md:p-12 transition-all duration-500"
        style={{
          background: 'rgba(16, 16, 16, 0.98)',
          backdropFilter: 'blur(40px)',
          scrollbarWidth: 'none',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          opacity: visible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <MagneticButton
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-transparent text-white hover:border-[#BC0000] hover:text-[#BC0000] transition-all duration-300 text-sm"
          cursorText="Close"
          strength={0.5}
        >
          ✕
        </MagneticButton>

        {/* Header */}
        <span
          className="block text-[10px] tracking-[3px] uppercase mb-4 opacity-50"
          style={{ fontFamily: "'Space Mono', monospace", color: '#BC0000' }}
        >
          // Legal
        </span>
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-10">
          {content.title}
        </h2>

        {/* Content */}
        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <div key={i} className="group">
              {section.heading && (
                <h3 className="font-bold text-sm md:text-base uppercase tracking-tight mb-3 text-white flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-[#BC0000] opacity-50" />
                  {section.heading}
                </h3>
              )}
              <p className="text-sm leading-[1.8] opacity-50 whitespace-pre-line pl-7">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] tracking-[2px] uppercase opacity-20" style={{ fontFamily: "'Space Mono', monospace" }}>
            Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={handleClose}
            className="text-[10px] tracking-[2px] uppercase opacity-30 hover:opacity-100 transition-opacity bg-transparent border-none text-white"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}

const legalContent = {
  privacy: {
    title: 'Datenschutzerklärung',
    sections: [
      {
        heading: '1. Verantwortlicher',
        text: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nACHECKMATE\nE-Mail: acheckmate100@gmail.com\n\nDer Verantwortliche entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten.',
      },
      {
        heading: '2. Erhebung und Speicherung personenbezogener Daten',
        text: 'Beim Besuch dieser Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliche Daten. Dies sind ausschließlich Informationen, die keine Rückschlüsse auf Ihre Person zulassen. Sie werden benötigt, um die Website korrekt darzustellen und die Stabilität und Sicherheit zu gewährleisten.',
      },
      {
        heading: '3. Kontaktaufnahme',
        text: 'Wenn Sie uns per E-Mail oder über andere Kommunikationswege kontaktieren, werden die von Ihnen mitgeteilten Daten (z.B. E-Mail-Adresse, Name, Nachrichteninhalt) von uns gespeichert, um Ihre Anfrage zu bearbeiten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.',
      },
      {
        heading: '4. Nutzung externer Dienste',
        text: 'Diese Website kann Links zu externen Plattformen enthalten, darunter Instagram, Roblox und Discord. Für die Datenverarbeitung durch diese Drittanbieter sind deren jeweilige Datenschutzbestimmungen maßgeblich. Wir haben keinen Einfluss auf die Datenverarbeitung dieser externen Dienste.',
      },
      {
        heading: '5. Google Fonts',
        text: 'Diese Website nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in den Browsercache, um Texte und Schriftarten korrekt anzuzeigen. Dabei wird eine Verbindung zu den Servern von Google hergestellt. Google erfährt dadurch, dass über Ihre IP-Adresse diese Website aufgerufen wurde.',
      },
      {
        heading: '6. Cookies',
        text: 'Diese Website verwendet keine Tracking-Cookies. Es werden keine personenbezogenen Daten zu Werbezwecken oder zur Analyse des Nutzerverhaltens erhoben oder an Dritte weitergegeben.',
      },
      {
        heading: '7. Ihre Rechte',
        text: 'Sie haben das Recht:\n• Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten\n• Berichtigung unrichtiger Daten zu verlangen\n• Löschung Ihrer Daten zu verlangen\n• Einschränkung der Verarbeitung zu verlangen\n• Datenübertragbarkeit zu verlangen\n• Sich bei einer Aufsichtsbehörde zu beschweren\n\nBitte wenden Sie sich hierzu an: acheckmate100@gmail.com',
      },
      {
        heading: '8. Änderungen',
        text: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.',
      },
    ],
  },
  terms: {
    title: 'Nutzungsbedingungen',
    sections: [
      {
        heading: '1. Geltungsbereich',
        text: 'Diese Nutzungsbedingungen gelten für die Nutzung der Website von ACHECKMATE (nachfolgend "Website"). Mit dem Zugriff auf diese Website erklären Sie sich mit diesen Bedingungen einverstanden.',
      },
      {
        heading: '2. Urheberrecht und geistiges Eigentum',
        text: 'Alle auf dieser Website veröffentlichten Inhalte, einschließlich Texte, Grafiken, Bilder, Animationen, Codes, Designs und Layouts, sind urheberrechtlich geschützt. Jede Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des Betreibers.',
      },
      {
        heading: '3. Nutzung der Inhalte',
        text: 'Die auf dieser Website dargestellten Inhalte dienen ausschließlich Informationszwecken. Es ist untersagt:\n• Inhalte ohne ausdrückliche Genehmigung zu kopieren, zu modifizieren oder weiterzuverbreiten\n• Automatisierte Systeme zum Scraping oder zur Datenextraktion einzusetzen\n• Die Website für rechtswidrige Zwecke zu nutzen\n• Die Funktionalität der Website zu beeinträchtigen',
      },
      {
        heading: '4. Externe Links',
        text: 'Diese Website enthält Links zu externen Websites Dritter. Für die Inhalte dieser verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung wurden die Seiten auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu dem Zeitpunkt der Verlinkung nicht erkennbar.',
      },
      {
        heading: '5. Haftungsausschluss',
        text: 'Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Betreiber übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Website erfolgt auf eigene Gefahr.',
      },
      {
        heading: '6. UGC und Roblox',
        text: 'Inhalte, die im Zusammenhang mit der Roblox-Plattform erstellt werden (UGC), unterliegen zusätzlich den Nutzungsbedingungen von Roblox Corporation. Die hier dargestellten Arbeiten und Projekte dienen der Portfolio-Präsentation.',
      },
      {
        heading: '7. Änderungen der Nutzungsbedingungen',
        text: 'Der Betreiber behält sich vor, diese Nutzungsbedingungen jederzeit ohne gesonderte Ankündigung zu ändern. Es gilt die jeweils aktuelle Version.',
      },
      {
        heading: '8. Anwendbares Recht',
        text: 'Es gilt das Recht der Bundesrepublik Deutschland. Bei Streitigkeiten, die aus oder im Zusammenhang mit der Nutzung dieser Website entstehen, ist der Gerichtsstand, soweit gesetzlich zulässig, der Sitz des Betreibers.',
      },
    ],
  },
  impressum: {
    title: 'Impressum',
    sections: [
      {
        heading: 'Angaben gemäß § 5 TMG',
        text: 'ACHECKMATE\nUGC Creator, Building Architect & Web Developer\n\nE-Mail: acheckmate100@gmail.com',
      },
      {
        heading: 'Kontakt',
        text: 'E-Mail: acheckmate100@gmail.com\nDiscord: gio0vani\nInstagram: @gio0vannii',
      },
      {
        heading: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
        text: 'ACHECKMATE\nE-Mail: acheckmate100@gmail.com',
      },
      {
        heading: 'Haftung für Inhalte',
        text: 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      },
      {
        heading: 'Haftung für Links',
        text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
      },
      {
        heading: 'Urheberrecht',
        text: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      },
      {
        heading: 'Streitschlichtung',
        text: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      },
    ],
  },
};
