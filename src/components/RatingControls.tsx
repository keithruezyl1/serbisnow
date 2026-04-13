
export const RatingControls = ({ onRate }: { onRate: (r: 1|2|3|4) => void }) => {
  return (
    <div style={{ display: 'flex', gap: 16, width: '100%' }}>
      <button 
        onClick={() => onRate(1)} 
        style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid var(--btn-bad)', color: 'var(--btn-bad)', padding: '12px 0', borderRadius: 8, fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        (1) Bad
      </button>
      <button 
        onClick={() => onRate(2)} 
        style={{ flex: 1, backgroundColor: 'rgba(254, 240, 138, 0.1)', border: '2px solid var(--btn-ok)', color: 'var(--btn-ok)', padding: '12px 0', borderRadius: 8, fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        (2) OK
      </button>
      <button 
        onClick={() => onRate(3)} 
        style={{ flex: 1, backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '2px solid var(--btn-good)', color: 'var(--btn-good)', padding: '12px 0', borderRadius: 8, fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        (3) Good
      </button>
      <button 
        onClick={() => onRate(4)} 
        style={{ flex: 1, backgroundColor: 'rgba(125, 211, 252, 0.1)', border: '2px solid var(--btn-perfect)', color: 'var(--btn-perfect)', padding: '12px 0', borderRadius: 8, fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        (4) Perfect
      </button>
    </div>
  );
};
