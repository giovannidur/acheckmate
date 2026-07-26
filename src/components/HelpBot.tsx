import { useState, useRef, useEffect } from 'react';

// Discord Webhook URL — Replace with your own!
// Create one at: Discord Server → Settings → Integrations → Webhooks
const DISCORD_WEBHOOK_URL = ''; // Leave empty to disable, or paste your webhook URL

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  time: string;
}

interface FAQ {
  keywords: string[];
  answer: string;
  action?: () => void;
}

const faqs: FAQ[] = [
  {
    keywords: ['hallo', 'hi', 'hey', 'moin', 'servus', 'hello'],
    answer: 'Hey! 👋 Schön dass du da bist. Wie kann ich dir helfen?',
  },
  {
    keywords: ['discord', 'dc'],
    answer: 'Mein Discord: gio0vani — Du kannst mich dort direkt anschreiben! 💬',
  },
  {
    keywords: ['instagram', 'insta', 'ig'],
    answer: 'Folge mir auf Instagram: @gio0vannii — Dort poste ich regelmäßig Content! 📸',
  },
  {
    keywords: ['roblox', 'ugc', 'avatar', 'item'],
    answer: 'Ich erstelle UGC Items, Outfits und baue Welten auf Roblox. Schau dir mein Profil an! 🎮',
  },
  {
    keywords: ['email', 'mail', 'kontakt', 'contact'],
    answer: 'Du kannst mir eine Email schreiben an: acheckmate100@gmail.com 📧',
  },
  {
    keywords: ['projekt', 'project', 'auftrag', 'arbeit', 'job', 'zusammenarbeit', 'collab'],
    answer: 'Cool dass du an einer Zusammenarbeit interessiert bist! Schreib mir am besten auf Discord (gio0vani) oder per Email. Beschreib kurz dein Projekt und ich melde mich! 🤝',
  },
  {
    keywords: ['preis', 'kosten', 'price', 'cost', 'was kostet', 'wie viel'],
    answer: 'Preise hängen vom Projekt ab. Schreib mir auf Discord mit Details zu deinem Projekt und ich mache dir ein Angebot! 💰',
  },
  {
    keywords: ['wer bist du', 'about', 'über dich', 'was machst du'],
    answer: 'Ich bin ACHECKMATE — UGC Creator, Web Developer und Building Architect. Ich verbinde Code mit Kreativität! ✨',
  },
  {
    keywords: ['danke', 'thanks', 'thx', 'dankeschön'],
    answer: 'Gerne! Wenn du noch Fragen hast, schreib einfach. Ansonsten — bis bald! 🙌',
  },
  {
    keywords: ['hilfe', 'help', 'commands', 'befehle'],
    answer: 'Du kannst mich fragen über: Discord, Instagram, Roblox, Projekte, Preise, oder einfach Hallo sagen! 🤖',
  },
];

const defaultResponses = [
  'Hmm, das hab ich nicht ganz verstanden. Versuch mal: "Discord", "Instagram", "Projekt" oder "Hilfe"! 🤔',
  'Darauf hab ich keine Antwort parat. Schreib mir direkt auf Discord (gio0vani) für komplexere Fragen! 💬',
  'Das weiß ich leider nicht. Aber du kannst mich auf Discord erreichen: gio0vani 🎮',
];

export default function HelpBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'bot',
      text: 'Hey! 👋 Ich bin der ACHECKMATE Bot. Frag mich was über Discord, Instagram, Projekte oder mehr!',
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [isOpen]);

  const findAnswer = (text: string): { answer: string; isImportant: boolean } => {
    const lower = text.toLowerCase();
    
    for (const faq of faqs) {
      if (faq.keywords.some(kw => lower.includes(kw))) {
        return { answer: faq.answer, isImportant: false };
      }
    }
    
    // Check if it seems like an important/complex question
    const importantKeywords = ['dringend', 'wichtig', 'urgent', 'asap', 'schnell', 'sofort', 'bezahlen', 'geld', 'kaufen', 'bestellen'];
    const isImportant = importantKeywords.some(kw => lower.includes(kw)) || text.length > 100;
    
    const randomDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return { answer: randomDefault, isImportant };
  };

  const sendToDiscord = async (userMessage: string) => {
    if (!DISCORD_WEBHOOK_URL) return;
    
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '💬 Neue Nachricht vom Website-Bot',
            description: userMessage,
            color: 0xBC0000,
            timestamp: new Date().toISOString(),
            footer: { text: 'acheckmate.is-a.dev' },
          }],
        }),
      });
    } catch (error) {
      console.log('Discord webhook not configured or failed');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const { answer, isImportant } = findAnswer(input);

    // If important, send to Discord
    if (isImportant && DISCORD_WEBHOOK_URL) {
      sendToDiscord(input.trim());
    }

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: isImportant && DISCORD_WEBHOOK_URL
          ? `${answer}\n\n📨 Ich hab ACHECKMATE benachrichtigt — er meldet sich bald bei dir!`
          : answer,
        time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 800 + Math.random() * 700);
  };

  const quickActions = [
    { label: 'Discord', msg: 'Was ist dein Discord?' },
    { label: 'Instagram', msg: 'Wie finde ich dich auf Instagram?' },
    { label: 'Projekt', msg: 'Ich hab eine Projektidee!' },
  ];

  return (
    <>
      {/* Chat Widget */}
      <div
        className="fixed bottom-6 right-6 z-[9100] transition-all duration-500"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transformOrigin: 'bottom right',
        }}
      >
        <div
          className="w-[360px] max-w-[calc(100vw-48px)] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
          style={{ background: 'rgba(16, 16, 16, 0.98)', backdropFilter: 'blur(40px)' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BC0000]/20 flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h4 className="font-bold text-sm">ACHECKMATE Bot</h4>
                <span className="text-[10px] opacity-40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'none' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-[#BC0000] rounded-br-sm'
                      : 'bg-white/10 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] opacity-40 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  setInput(action.msg);
                  setTimeout(() => handleSend(), 100);
                }}
                className="text-[10px] tracking-normal sm:tracking-wide uppercase px-3.5 py-2 rounded-full border border-white/10 hover:border-[#BC0000]/40 hover:bg-[#BC0000]/10 transition-all whitespace-nowrap shrink-0"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Schreib eine Nachricht..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-[#BC0000]/40 transition-colors placeholder:opacity-30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-full bg-[#BC0000] flex items-center justify-center hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9050] w-14 h-14 rounded-full bg-[#BC0000] flex items-center justify-center shadow-lg shadow-[#BC0000]/30 hover:scale-110 transition-all duration-300 group"
        style={{
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
        }}
        data-cursor-text="Chat"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
        
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#BC0000] text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </>
  );
}
