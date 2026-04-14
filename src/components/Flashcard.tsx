import { useState, useEffect, useCallback } from 'react';
import type { SessionCard } from '../types';
import { RatingControls } from './RatingControls';
import { TypedAnswerInput } from './TypedAnswerInput';
import { Keyboard } from 'lucide-react';

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
  const [answerCheckState, setAnswerCheckState] = useState<'idle' | 'correct' | 'incorrect' | 'incomplete'>('idle');
  const [lastTypedAnswer, setLastTypedAnswer] = useState('');

  useEffect(() => {
    setIsRevealed(false);
    setIsFlipping(false);
    setIsAnswerModeOpen(initialAnswerMode);
    setAnswerCheckState('idle');
    setLastTypedAnswer('');
  }, [card.id, initialAnswerMode]);

  const executeFlip = useCallback(() => {
    if (isRevealed || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setIsRevealed(true);
    }, 150);
    setTimeout(() => {
      setIsFlipping(false);
    }, 300);
  }, [isRevealed, isFlipping]);

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

  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const tokenize = (str: string) => normalize(str).split(' ').filter(Boolean);

  const isSubsequence = (needle: string[], haystack: string[]) => {
    if (needle.length === 0) return false;
    let j = 0;
    for (let i = 0; i < haystack.length && j < needle.length; i++) {
      if (haystack[i] === needle[j]) j++;
    }
    return j === needle.length;
  };

  const renderHighlightedCorrectAnswer = (typed: string, correct: string) => {
    const typedTokens = tokenize(typed);
    const correctTokens = tokenize(correct);
    if (typedTokens.length === 0 || correctTokens.length === 0) return correct;

    // Determine which correct-token indices are matched by typed tokens (in order).
    const matchedCorrectIdx = new Set<number>();
    let j = 0;
    for (let i = 0; i < correctTokens.length && j < typedTokens.length; i++) {
      if (correctTokens[i] === typedTokens[j]) {
        matchedCorrectIdx.add(i);
        j++;
      }
    }

    // Reconstruct original `correct` preserving punctuation/spacing, while highlighting matched word tokens.
    const parts = correct.split(/(\w+)/g);
    let wordTokenIdx = 0;
    return parts.map((part, idx) => {
      if (/^\w+$/.test(part)) {
        const isMatched = matchedCorrectIdx.has(wordTokenIdx);
        wordTokenIdx++;
        return isMatched ? (
          <span key={idx} className="answer-highlight">
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const handleCheckAnswer = (typed: string) => {
    setLastTypedAnswer(typed);

    const typedNorm = normalize(typed);
    const correctNorm = normalize(card.front);

    if (typedNorm.length > 0 && typedNorm === correctNorm) {
      setAnswerCheckState('correct');
    } else {
      const typedTokens = tokenize(typed);
      const correctTokens = tokenize(card.front);
      if (isSubsequence(typedTokens, correctTokens)) {
        setAnswerCheckState('incomplete');
      } else {
        setAnswerCheckState('incorrect');
      }
    }
    setIsFlipping(true);
    setTimeout(() => setIsRevealed(true), 150);
    setTimeout(() => setIsFlipping(false), 300);
  };

  let outlineColor = 'var(--outline-default)';
  if (answerCheckState === 'correct') outlineColor = 'var(--outline-correct)';
  if (answerCheckState === 'incorrect') outlineColor = 'var(--outline-incorrect)';
  if (answerCheckState === 'incomplete') outlineColor = 'var(--outline-incomplete)';

  return (
    <div className="card-shell">
      <div 
        onClick={() => !isRevealed && executeFlip()}
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
              {answerCheckState === 'incomplete'
                ? renderHighlightedCorrectAnswer(lastTypedAnswer, card.front)
                : card.front}
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
      </div>
    </div>
  );
};
