import { X } from 'lucide-react';

export const HelpModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--card-bg)', border: '1px solid var(--outline-default)',
        borderRadius: 16, padding: 32, maxWidth: 600, width: '90%', position: 'relative',
        color: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: '1.5rem' }}>How to Use This Tool</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, lineHeight: 1.6 }}>
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
