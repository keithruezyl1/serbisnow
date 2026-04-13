
export const ProgressPills = ({ initialIds, cardRatings, currentId }: { initialIds: string[], cardRatings: Record<string, number>, currentId: string }) => {
    return (
        <div className="progress-pills">
            {initialIds.map((id) => {
                const rating = cardRatings[id];
                const isCurrent = id === currentId;
                let bg = 'rgba(255,255,255,0.2)';
                if (rating === 1) bg = 'var(--btn-bad)';
                if (rating === 2) bg = 'var(--btn-ok)';
                if (rating === 3) bg = 'var(--btn-good)';
                if (rating === 4) bg = 'var(--btn-perfect)';
                
                return (
                    <div
                        key={id}
                        className={`progress-pill${isCurrent ? ' current' : ''}`}
                        style={{ backgroundColor: bg }}
                    />
                )
            })}
        </div>
    );
};
