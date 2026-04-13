import { useState } from 'react';
import Papa from 'papaparse';
import type { Card } from '../types';

export const CsvLoader = ({ onLoaded }: { onLoaded: (cards: Card[]) => void }) => {
  const [error, setError] = useState('');

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Welcome to StudySystem</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>Please upload your CSV to begin. Requires: id, term, definition.</p>
      
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
        <input type="file" accept=".csv" onChange={handleFile} style={{ display: 'none' }} />
      </label>

      {error && <div style={{ marginTop: 20, color: 'var(--outline-incorrect)' }}>{error}</div>}
    </div>
  );
};
