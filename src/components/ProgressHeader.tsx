
export const ProgressHeader = ({ remainingInQueue, completedCount, totalCount }: any) => {
  return (
    <div className="stats-row">
      <div className="stat-pill">
        Queue: <span style={{ color: 'white', marginLeft: 8 }}>{remainingInQueue} cards</span>
      </div>
      <div className="stat-pill">
        Progress: <span style={{ color: 'white', marginLeft: 8 }}>{completedCount} / {totalCount}</span>
      </div>
    </div>
  );
};
