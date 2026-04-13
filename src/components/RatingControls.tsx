
export const RatingControls = ({ onRate }: { onRate: (r: 1|2|3|4) => void }) => {
  return (
    <div className="rating">
      <button 
        onClick={() => onRate(1)} 
        className="rate-btn"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: 'var(--btn-bad)', color: 'var(--btn-bad)' }}
      >
        (1) Bad
      </button>
      <button 
        onClick={() => onRate(2)} 
        className="rate-btn"
        style={{ backgroundColor: 'rgba(254, 240, 138, 0.12)', borderColor: 'var(--btn-ok)', color: 'var(--btn-ok)' }}
      >
        (2) OK
      </button>
      <button 
        onClick={() => onRate(3)} 
        className="rate-btn"
        style={{ backgroundColor: 'rgba(74, 222, 128, 0.12)', borderColor: 'var(--btn-good)', color: 'var(--btn-good)' }}
      >
        (3) Good
      </button>
      <button 
        onClick={() => onRate(4)} 
        className="rate-btn"
        style={{ backgroundColor: 'rgba(125, 211, 252, 0.12)', borderColor: 'var(--btn-perfect)', color: 'var(--btn-perfect)' }}
      >
        (4) Perfect
      </button>
    </div>
  );
};
