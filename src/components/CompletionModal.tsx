
export const CompletionModal = ({ allDone, completedCount, totalCount, onNext }: any) => {
  return (
    <div className="overlay">
      <div className="modal" style={{ textAlign: 'center', borderColor: 'rgba(255,255,255,0.12)' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: 10, color: 'var(--outline-default)' }}>
          Congratulations!
        </h2>
        <p style={{ fontSize: '1.05rem', marginBottom: 20, color: 'var(--text-secondary)' }}>
          You have completed the current queue.
        </p>
        <p style={{ fontSize: '1.25rem', marginBottom: 20, fontWeight: 900 }}>
          Total Progress: {completedCount} / {totalCount}
        </p>
        
        {!allDone ? (
          <button 
            onClick={onNext} 
            className="cta"
          >
            Start Next 20
          </button>
        ) : (
          <div style={{ color: 'var(--outline-correct)', fontSize: '1.5rem', fontWeight: 'bold' }}>
            You have finished all cards!
          </div>
        )}
      </div>
    </div>
  );
};
