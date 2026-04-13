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
    <div className="card-shell">
      <div 
        onClick={() => !isRevealed && !isAnswerModeOpen && executeFlip()}
        className="flashcard"
        style={{
          border: `3px solid ${outlineColor}`,
          cursor: isRevealed ? 'default' : 'pointer',
          transition: 'transform 0.15s ease-in-out',
          transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
        }}
      >
        <h2 style={{ opacity: isRevealed ? 0.72 : 1 }}>
          {card.back}
        </h2>
        
        {isRevealed && (
          <div className="answer">
            <p>
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
            className="btn icon-btn kbd-toggle"
            title="Open Typed Answer Mode"
            aria-label="Open typed answer mode"
          >
            <Keyboard size={24} />
          </button>
        )}
      </div>

      <div className="helper-row">
        {isRevealed ? (
          <RatingControls onRate={onRate} />
        ) : (
          <span>Tap to reveal</span>
        )}
      </div>

      <div style={{ minHeight: 56, width: '100%', display: 'flex', justifyContent: 'center', padding: '0 8px' }}>
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
