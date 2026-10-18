import React from 'react';
import { RotateCcw, Info } from 'lucide-react';

export function SettingsView({ onResetJourney }) {
  return (
    <div className="settings-view-container">
      <div className="view-intro-banner">
        <h2>Journey Settings & Information</h2>
        <p>Preferences, sound controls, and editing instructions.</p>
      </div>

      <div className="settings-cards-list">
        <section className="settings-card">
          <div className="settings-card-header">
            <Info size={20} className="card-icon" />
            <h3>How to Personalize Your Content</h3>
          </div>
          <p>
            You can customize every single compliment, heartfelt response, and photo later by editing:
          </p>
          <code className="path-code-block">src/data/alphabet.js</code>
          <p>
            Photos can be dropped into:
          </p>
          <code className="path-code-block">public/images/letters/ (a.jpg, b.jpg ... z.jpg)</code>
        </section>

        <section className="settings-card danger-card">
          <div className="settings-card-header">
            <RotateCcw size={20} className="card-icon" />
            <h3>Restart Journey Progress</h3>
          </div>
          <p>
            Reset all unlocked progress and return to letter A. Useful for experiencing the unlocking journey from scratch.
          </p>
          <button
            type="button"
            className="settings-reset-btn"
            onClick={onResetJourney}
          >
            Reset All Progress to A
          </button>
        </section>
      </div>
    </div>
  );
}
