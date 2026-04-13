
export const ProgressHeader = ({ remainingInQueue, completedCount, totalCount }: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, color: 'var(--text-secondary)', zIndex: 10 }}>
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 24px', borderRadius: 24, fontSize: '1.1rem', fontWeight: 500 }}>
        Queue: <span style={{ color: 'white', marginLeft: 8 }}>{remainingInQueue} cards</span>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 24px', borderRadius: 24, fontSize: '1.1rem', fontWeight: 500 }}>
        Progress: <span style={{ color: 'white', marginLeft: 8 }}>{completedCount} / {totalCount}</span>
      </div>
    </div>
  );
};
