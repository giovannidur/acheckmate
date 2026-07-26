import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  cursorText?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as = 'button',
  href,
  target,
  rel,
  onClick,
  cursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  const Tag = as as any;

  return (
    <div
      ref={ref}
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Tag
        className={className}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        data-cursor-text={cursorText}
      >
        {children}
      </Tag>
    </div>
  );
}
