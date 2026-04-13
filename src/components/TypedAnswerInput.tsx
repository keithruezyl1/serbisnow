import { useRef, useEffect, useState } from 'react';

export const TypedAnswerInput = ({ onCheck }: { onCheck: (v: string) => void }) => {
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input 
      ref={inputRef}
      type="text"
      value={val}
      onChange={e => setVal(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onCheck(val);
        }
      }}
      placeholder="Type your answer and press Enter..."
      style={{
        width: '100%',
        minWidth: 400,
        padding: '16px 20px',
        borderRadius: 8,
        border: '2px solid rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        fontSize: '1.1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--outline-default)')}
      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.3)')}
    />
  );
};
