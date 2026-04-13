import { useState } from 'react';
import Papa from 'papaparse';
import type { Card } from '../types';

export const CsvLoader = ({ onLoaded }: { onLoaded: (cards: Card[]) => void }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        if (data.length === 0) {
          setError('CSV is empty');
          return;
        }
        const first = data[0];
        if (!('id' in first && 'term' in first && 'definition' in first)) {
          setError('CSV missing required columns: id, term, definition');
          return;
        }

        const cards: Card[] = data.map(row => ({
          id: row.id,
          front: row.term,
          back: row.definition,
          scope: row.scope
        }));
        onLoaded(cards);
      },
      error: (err: any) => {
        setError(err.message);
      }
    });
  };

  const handleUseBuiltInDeck = async () => {
    setError('');
    setLoading(true);
    try {
      // Use BASE_URL so it works with GitHub Pages subpaths / relative base.
      const url = `${import.meta.env.BASE_URL}cards.csv`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load built-in deck (${res.status})`);
      const text = await res.text();

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];
          if (data.length === 0) {
            setError('Built-in deck is empty');
            setLoading(false);
            return;
          }
          const first = data[0];
          if (!('id' in first && 'term' in first && 'definition' in first)) {
            setError('Built-in deck is missing required columns: id, term, definition');
            setLoading(false);
            return;
          }

          const cards: Card[] = data.map(row => ({
            id: String(row.id),
            front: row.term,
            back: row.definition,
            scope: row.scope
          }));
          onLoaded(cards);
        },
        error: (err: any) => {
          setError(err.message);
          setLoading(false);
        }
      });
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load built-in deck');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Welcome to StudySystem</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Start with the built-in deck, or upload your own CSV.</p>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>CSV requires columns: id, term, definition.</p>

      <button
        onClick={handleUseBuiltInDeck}
        disabled={loading}
        style={{
          padding: '14px 28px',
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 12,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1.05rem',
          color: 'white',
          transition: 'all 0.2s',
          marginBottom: 18,
          width: 280
        }}
      >
        {loading ? 'Loading…' : 'Use built-in deck'}
      </button>
      
      <label style={{
        padding: '16px 32px',
        backgroundColor: 'var(--card-bg)',
        border: '2px dashed var(--outline-default)',
        borderRadius: 12,
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'white',
        transition: 'all 0.2s'
      }}>
        Choose CSV File
        <input type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} disabled={loading} />
      </label>

      {error && <div style={{ marginTop: 20, color: 'var(--outline-incorrect)' }}>{error}</div>}
    </div>
  );
};
