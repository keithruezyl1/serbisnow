
export const ProgressPills = ({ initialIds, cardRatings, currentId }: { initialIds: string[], cardRatings: Record<string, number>, currentId: string }) => {
    return (
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
            {initialIds.map((id) => {
                const rating = cardRatings[id];
                const isCurrent = id === currentId;
                let bg = 'rgba(255,255,255,0.2)';
                if (rating === 1) bg = 'var(--btn-bad)';
                if (rating === 2) bg = 'var(--btn-ok)';
                if (rating === 3) bg = 'var(--btn-good)';
                if (rating === 4) bg = 'var(--btn-perfect)';
                
                return (
                    <div key={id} style={{
                        width: 24, height: 8, borderRadius: 4,
                        backgroundColor: bg,
                        border: isCurrent ? '2px solid white' : 'none',
                        boxShadow: isCurrent ? '0 0 8px white' : 'none',
                        opacity: isCurrent ? 1 : 0.6,
                        transition: 'all 0.2s',
                        boxSizing: 'border-box'
                    }} />
                )
            })}
        </div>
    );
};
