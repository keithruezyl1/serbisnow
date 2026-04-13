import { X } from 'lucide-react';

export const HelpModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Help & Instructions">
      <div className="modal" style={{ borderColor: 'rgba(252, 211, 77, 0.35)' }}>
        <button onClick={onClose} className="btn icon-btn close-btn" aria-label="Close help">
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: 14, fontSize: '1.35rem' }}>How to use</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.92)' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--outline-default)', fontSize: '1.2rem' }}>Flipping Cards</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Click the card or press the <strong>Spacebar</strong> to flip between the question and the hidden answer.</p>
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--outline-default)', fontSize: '1.2rem' }}>The Batching System</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Cards are shuffled and served in dynamic blocks of <strong>20 questions</strong>. You must clear the current block to 0 remaining before drawing the next set from the total pool.</p>
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--outline-default)', fontSize: '1.2rem' }}>1-4 Rating System</h3>
            <p style={{ margin: 0, marginBottom: 8, opacity: 0.9 }}>After revealing the answer, press keys 1-4 to rate your memory. The top progress pills visually represent your queue:</p>
            <ul style={{ margin: 0, paddingLeft: 20, opacity: 0.9, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>(1) Bad</strong>: Re-inserts the card closely tracking ahead (exactly 3 turns away).</li>
              <li><strong>(2) OK</strong>: Pushes the card to the back of the active queue. Requires 2 consecutive "OK" hits to equal a "Good".</li>
              <li><strong>(3) Good</strong>: Pushes the card to the back of the active queue.</li>
              <li><strong>(4) Perfect</strong>: Marks the card as complete, turning it blue and permanently pinning it to the left to indicate mastery.</li>
            </ul>
          </div>

          <div>
            <h3 style={{ margin: '0 0 8px 0', color: 'var(--outline-default)', fontSize: '1.2rem' }}>Text Answer System</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Click the keyboard icon to open Typed Answer mode. Type your answer and press <strong>Enter</strong> to check it. The system automatically ignores punctuation and capitalization, but enforces structural accuracy (e.g. term order). Whether right or wrong, the card will execute a 3D flip so you can see the answer and officially grade yourself 1-4 to progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
