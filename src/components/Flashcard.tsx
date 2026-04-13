import { useState, useEffect, useCallback } from 'react';
import type { SessionCard } from '../types';
import { RatingControls } from './RatingControls';
import { TypedAnswerInput } from './TypedAnswerInput';
import { Keyboard, Check, X } from 'lucide-react';

interface FlashcardProps {
  card: SessionCard;
  onRate: (rating: 1 | 2 | 3 | 4) => void;
  initialAnswerMode?: boolean;
  onAnswerModeChange?: (mode: boolean) => void;
}

export const Flashcard = ({ card, onRate, initialAnswerMode = false, onAnswerModeChange }: FlashcardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnswerModeOpen, setIsAnswerModeOpen] = useState(initialAnswerMode);
  const [answerCheckState, setAnswerCheckState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  useEffect(() => {
    setIsRevealed(false);
    setIsFlipping(false);
    setIsAnswerModeOpen(initialAnswerMode);
    setAnswerCheckState('idle');
  }, [card.id, initialAnswerMode]);

  const executeFlip = useCallback(() => {
    if (isRevealed || isFlipping || isAnswerModeOpen) return;
    setIsFlipping(true);
    setTimeout(() => {
      setIsRevealed(true);
    }, 150);
    setTimeout(() => {
      setIsFlipping(false);
    }, 300);
  }, [isRevealed, isFlipping, isAnswerModeOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        executeFlip();
      }
      if (isRevealed) {
        if (e.key === '1') onRate(1);
        if (e.key === '2') onRate(2);
        if (e.key === '3') onRate(3);
        if (e.key === '4') onRate(4);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, onRate, executeFlip]);

  const handleCheckAnswer = (typed: string) => {
    const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    
    if (normalize(typed) === normalize(card.front)) {
      setAnswerCheckState('correct');
    } else {
      setAnswerCheckState('incorrect');
    }
    setIsFlipping(true);
    setTimeout(() => setIsRevealed(true), 150);
    setTimeout(() => setIsFlipping(false), 300);
  };

  let outlineColor = 'var(--outline-default)';
  if (answerCheckState === 'correct') outlineColor = 'var(--outline-correct)';
  if (answerCheckState === 'incorrect') outlineColor = 'var(--outline-incorrect)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 640 }}>
      <div 
        onClick={() => !isRevealed && !isAnswerModeOpen && executeFlip()}
        style={{
          width: '100%',
          minHeight: 300,
          backgroundColor: 'var(--card-bg)',
          borderRadius: 16,
          border: `3px solid ${outlineColor}`,
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: isRevealed ? 'default' : 'pointer',
          textAlign: 'center',
          transition: 'transform 0.15s ease-in-out',
          transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500, lineHeight: 1.5, opacity: isRevealed ? 0.7 : 1 }}>
          {card.back}
        </h2>
        
        {isRevealed && (
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%' }}>
            <p style={{ fontSize: '2.5rem', color: 'var(--outline-default)', margin: 0, fontWeight: 'bold' }}>
              {card.front}
            </p>
          </div>
        )}

        {!isRevealed && (
          <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                setIsAnswerModeOpen(true); 
                if (onAnswerModeChange) onAnswerModeChange(true); 
            }}
            style={{ position: 'absolute', bottom: 16, right: 16, opacity: 0.6, padding: 8 }}
            title="Open Typed Answer Mode"
          >
            <Keyboard size={24} />
          </button>
        )}
      </div>

      <div style={{ height: 80, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
        {isRevealed ? (
          <RatingControls onRate={onRate} />
        ) : (
          <span style={{ opacity: 0.5 }}>Press Space or click card to reveal</span>
        )}
      </div>

      <div style={{ height: 60, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {isAnswerModeOpen && !isRevealed && <TypedAnswerInput onCheck={handleCheckAnswer} />}
        {answerCheckState === 'correct' && isRevealed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '2px solid var(--outline-correct)', color: 'var(--outline-correct)', borderRadius: 24, fontWeight: 'bold' }}>
            <Check size={20} strokeWidth={3} />
            Correct
          </div>
        )}
        {answerCheckState === 'incorrect' && isRevealed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid var(--outline-incorrect)', color: 'var(--outline-incorrect)', borderRadius: 24, fontWeight: 'bold' }}>
            <X size={20} strokeWidth={3} />
            Incorrect
          </div>
        )}
      </div>
    </div>
  );
};
