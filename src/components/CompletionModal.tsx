interface CompletionModalProps {
  allDone: boolean;
  completedCount: number;
  totalCount: number;
  batchElapsedMs: number;
  onNext: () => void;
}

const formatDuration = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
};

export const CompletionModal = ({ allDone, completedCount, totalCount, batchElapsedMs, onNext }: CompletionModalProps) => {
  const progress = totalCount > 0 ? Math.max(0, Math.min(1, completedCount / totalCount)) : 0;
  const size = 148;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dashOffset = c * (1 - progress);

  return (
    <div className="overlay">
      <div className="modal" style={{ textAlign: 'center', borderColor: 'rgba(255,255,255,0.12)' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: 10, color: 'var(--outline-default)' }}>
          Congratulations!
        </h2>

        <div className="completion-ring" role="img" aria-label={`Total progress: ${completedCount} of ${totalCount}`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="completion-ring__svg">
            <defs>
              <linearGradient id="completionRingStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 1)" />
                <stop offset="55%" stopColor="rgba(236, 72, 153, 1)" />
                <stop offset="100%" stopColor="rgba(250, 204, 21, 1)" />
              </linearGradient>
            </defs>
            <circle
              className="completion-ring__track"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
            />
            <circle
              className="completion-ring__progress"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="url(#completionRingStroke)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="completion-ring__center">
            <div className="completion-ring__sub completion-ring__sub--only">
              {completedCount} / {totalCount}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '1.02rem', margin: '14px 0 10px', opacity: 0.8 }}>
          Total time: {formatDuration(batchElapsedMs)}
        </p>

        <p style={{ fontSize: '1.05rem', margin: '0 0 18px', color: 'var(--text-secondary)' }}>
          Ready to start the next batch?
        </p>
        
        {!allDone ? (
          <button 
            onClick={onNext} 
            className="cta"
          >
            I'm ready
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
