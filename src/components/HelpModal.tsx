import { X } from 'lucide-react';

export const HelpModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="overlay overlay--scroll" role="dialog" aria-modal="true" aria-label="Help & Instructions">
      <div className="modal help-modal" style={{ borderColor: 'rgba(252, 211, 77, 0.35)' }}>
        <button type="button" onClick={onClose} className="btn icon-btn close-btn" aria-label="Close help">
          <X size={24} />
        </button>

        <h2 className="help-modal-title">How to use</h2>

        <div className="help-modal-body">
          <div className="help-modal-section">
            <h3 className="help-modal-heading">Flipping Cards</h3>
            <p className="help-modal-p">Click the card or press the <strong>Spacebar</strong> to flip between the question and the hidden answer.</p>
          </div>

          <div className="help-modal-section">
            <h3 className="help-modal-heading">The Batching System</h3>
            <p className="help-modal-p">Cards are shuffled and served in dynamic blocks of <strong>20 questions</strong>. You must clear the current block to 0 remaining before drawing the next set from the total pool.</p>
          </div>

          <div className="help-modal-section">
            <h3 className="help-modal-heading">1-4 Rating System</h3>
            <p className="help-modal-p help-modal-p--tight">After revealing the answer, press keys 1-4 to rate your memory. The top progress pills visually represent your queue:</p>
            <ul className="help-modal-list">
              <li><strong>(1) Bad</strong>: Re-inserts the card closely tracking ahead (exactly 3 turns away).</li>
              <li><strong>(2) OK</strong>: Pushes the card to the back of the active queue. Requires 2 consecutive &quot;OK&quot; hits to equal a &quot;Good&quot;.</li>
              <li><strong>(3) Good</strong>: Pushes the card to the back of the active queue.</li>
              <li><strong>(4) Perfect</strong>: Marks the card as complete, turning it blue and permanently pinning it to the left to indicate mastery.</li>
            </ul>
          </div>

          <div className="help-modal-section">
            <h3 className="help-modal-heading">Text Answer System</h3>
            <p className="help-modal-p">Click the keyboard icon to open Typed Answer mode. Type your answer and press <strong>Enter</strong> to check it. The system automatically ignores punctuation and capitalization, but enforces structural accuracy (e.g. term order). Whether right or wrong, the card will execute a 3D flip so you can see the answer and officially grade yourself 1-4 to progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
