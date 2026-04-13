import { useState, useEffect } from 'react';
import { CsvLoader } from './components/CsvLoader';
import { StudySession } from './components/StudySession';
import { HelpModal } from './components/HelpModal';
import { HelpCircle } from 'lucide-react';
import type { Card, SessionCard } from './types';
import './index.css';

const STORAGE_KEY = 'vaia_flashcards_state';

interface AppState {
  parsedCards: Card[];
  completedIds: string[];
  activeQueue: SessionCard[];
  sessionInitialIds?: string[];
  cardRatings?: Record<string, number>;
}

function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setState(JSON.parse(saved));
    }
  }, []);

  const saveState = (newState: AppState) => {
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const handleCardsLoaded = (cards: Card[]) => {
    saveState({
      parsedCards: cards,
      completedIds: [],
      activeQueue: [],
      sessionInitialIds: [],
      cardRatings: {}
    });
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(null);
  };

  if (!state) {
    return <CsvLoader onLoaded={handleCardsLoaded} />;
  }

  return (
    <div className="app-shell">
      <div className="top-actions">
        <button onClick={handleReset} className="btn">
          Reset
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="btn icon-btn"
          title="Help & Instructions"
          aria-label="Help & Instructions"
        >
          <HelpCircle size={22} />
        </button>
      </div>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <StudySession 
        state={state} 
        updateState={saveState} 
      />
    </div>
  );
}

export default App;
