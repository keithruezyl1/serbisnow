import { useLayoutEffect, useMemo, useRef } from 'react';

type ProgressPillsProps = {
  initialIds: string[];
  cardRatings: Record<string, number>;
  currentId: string;
};

export const ProgressPills = ({ initialIds, cardRatings, currentId }: ProgressPillsProps) => {
  const pillNodes = useRef(new Map<string, HTMLDivElement>());
  const prevRects = useRef(new Map<string, DOMRect>());

  const idsKey = useMemo(() => initialIds.join('|'), [initialIds]);

  useLayoutEffect(() => {
    const nextRects = new Map<string, DOMRect>();

    // Measure new layout.
    for (const id of initialIds) {
      const el = pillNodes.current.get(id);
      if (!el) continue;
      nextRects.set(id, el.getBoundingClientRect());
    }

    // Animate from previous layout -> new layout.
    for (const id of initialIds) {
      const el = pillNodes.current.get(id);
      if (!el) continue;

      const prev = prevRects.current.get(id);
      const next = nextRects.get(id);
      if (!prev || !next) continue;

      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;

      // Invert
      el.style.transition = 'transform 0s';
      el.style.setProperty('--tx', `${dx}px`);
      el.style.setProperty('--ty', `${dy}px`);
      el.style.willChange = 'transform';

      // Play
      requestAnimationFrame(() => {
        el.style.transition = '';
        el.style.setProperty('--tx', `0px`);
        el.style.setProperty('--ty', `0px`);
      });
    }

    prevRects.current = nextRects;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, currentId]);

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
            ref={(node) => {
              if (node) pillNodes.current.set(id, node);
              else pillNodes.current.delete(id);
            }}
            className={`progress-pill${isCurrent ? ' current' : ''}`}
            style={{ backgroundColor: bg }}
          />
        );
      })}
    </div>
  );
};
