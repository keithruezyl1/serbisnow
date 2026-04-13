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
    <div className="loader">
      <h1>StudySystem</h1>
      <p>Start with the built-in deck, or upload your own CSV.</p>
      <p>CSV requires columns: <strong>id</strong>, <strong>term</strong>, <strong>definition</strong>.</p>

      <div className="loader-actions">
        <button onClick={handleUseBuiltInDeck} disabled={loading} className="btn btn-primary">
          {loading ? 'Loading…' : 'Use built-in deck'}
        </button>

        <label className="file-drop">
          Choose CSV File
          <input type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} disabled={loading} />
        </label>

        {error && <div style={{ color: 'var(--outline-incorrect)' }}>{error}</div>}
      </div>
    </div>
  );
};
