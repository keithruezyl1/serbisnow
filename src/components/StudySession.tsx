import { useState, useEffect } from 'react';
import type { Card } from '../types';
import { Flashcard } from './Flashcard';
import { ProgressHeader } from './ProgressHeader';
import { CompletionModal } from './CompletionModal';
import { ProgressPills } from './ProgressPills';

export const StudySession = ({ state, updateState }: { state: any, updateState: any }) => {
  const [showModal, setShowModal] = useState(false);

  const totalCards = state.parsedCards.length;
  const completedCount = state.completedIds.length;
  const unfinishedCards = state.parsedCards.filter((c: Card) => !state.completedIds.includes(c.id));

  useEffect(() => {
    if (state.activeQueue.length === 0 && !showModal) {
      if (completedCount === 0 && unfinishedCards.length > 0) {
        startNext20();
      } else if (completedCount > 0) {
        setShowModal(true);
      }
    }
  }, [state.activeQueue.length, showModal, completedCount, unfinishedCards.length]);

  const startNext20 = () => {
    const shuffled = [...unfinishedCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20).map(c => ({ ...c, okCount: 0 }));
    updateState({ 
        ...state, 
        activeQueue: selected,
        sessionInitialIds: selected.map(c => c.id),
        cardRatings: {} 
    });
    setShowModal(false);
  };

  const handleRate = (rating: 1 | 2 | 3 | 4) => {
    if (state.activeQueue.length === 0) return;
    const queue = [...state.activeQueue];
    const current = queue.shift()!;
    const newCardRatings = { ...(state.cardRatings || {}) };
    newCardRatings[current.id] = rating;

    if (rating === 1) {
      const insertAt = Math.min(3, queue.length);
      queue.splice(insertAt, 0, current);
    } else if (rating === 2) {
      current.okCount += 1;
      queue.push(current);
    } else if (rating === 3) {
      queue.push(current);
    } else if (rating === 4) {
      updateState({
        ...state,
        activeQueue: queue,
        completedIds: [...state.completedIds, current.id],
        cardRatings: newCardRatings
      });
      return;
    }

    updateState({ ...state, activeQueue: queue, cardRatings: newCardRatings });
  };

  const currentId = state.activeQueue.length > 0 ? state.activeQueue[0].id : '';
  const sessionCompletedIds = (state.sessionInitialIds || []).filter((id: string) => state.completedIds.includes(id));
  const activeIds = state.activeQueue.map((c: any) => c.id);
  const displayIds = [...sessionCompletedIds, ...activeIds];
  const [answerMode, setAnswerMode] = useState(false);

  return (
    <div className="study">
      <div className="study-header">
        <ProgressHeader 
          remainingInQueue={state.activeQueue.length} 
          completedCount={completedCount} 
          totalCount={totalCards} 
        />
        {displayIds.length > 0 && (
          <ProgressPills 
             initialIds={displayIds} 
             cardRatings={state.cardRatings || {}} 
             currentId={currentId} 
          />
        )}
      </div>

      {state.activeQueue.length > 0 && !showModal && (
        <Flashcard 
          key={state.activeQueue[0].id} 
          card={state.activeQueue[0]} 
          onRate={handleRate}
          initialAnswerMode={answerMode}
          onAnswerModeChange={setAnswerMode}
        />
      )}

      {showModal && (
        <CompletionModal 
          allDone={unfinishedCards.length === 0}
          completedCount={completedCount}
          totalCount={totalCards}
          onNext={startNext20}
        />
      )}
    </div>
  );
};
