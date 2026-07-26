import { useEffect, useState, useCallback } from 'react';

let showToastGlobal: (text: string) => void = () => {};

export function triggerToast(text: string) {
  showToastGlobal(text);
}

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const show = useCallback((msg: string) => {
    setText(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    showToastGlobal = show;
  }, [show]);

  return (
    <div className={`toast ${visible ? 'visible' : ''}`}>
      <span style={{
        background: '#BC0000',
        color: '#fff',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        flexShrink: 0,
      }}>✓</span>
      <span>{text}</span>
    </div>
  );
}
