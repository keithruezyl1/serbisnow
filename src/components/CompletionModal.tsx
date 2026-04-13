
export const CompletionModal = ({ allDone, completedCount, totalCount, onNext }: any) => {
  return (
    <div style={{
      position: 'absolute', inset: 0, 
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', zIndex: 20
    }}>
      <div style={{
        backgroundColor: 'var(--card-bg)', padding: '48px', borderRadius: 16,
        textAlign: 'center', maxWidth: 500, minWidth: 400,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: 16, color: 'var(--outline-default)', marginTop: 0 }}>
          Congratulations!
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: 32, color: 'var(--text-secondary)' }}>
          You have completed the current queue.
        </p>
        <p style={{ fontSize: '1.5rem', marginBottom: 40, fontWeight: 'bold' }}>
          Total Progress: {completedCount} / {totalCount}
        </p>
        
        {!allDone ? (
          <button 
            onClick={onNext} 
            style={{
              padding: '16px 32px',
              backgroundColor: 'var(--outline-default)',
              color: '#451a03',
              fontWeight: 'bold',
              borderRadius: 8,
              fontSize: '1.2rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.1s'
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
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
