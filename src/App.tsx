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
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', flex: 1, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center', zIndex: 100 }}>
        <button 
          onClick={handleReset}
          style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 4, color: 'white', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Reset All
        </button>
        <button
          onClick={() => setShowHelp(true)}
          style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.8, padding: 0 }}
          title="Help & Instructions"
        >
          <HelpCircle size={24} />
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
