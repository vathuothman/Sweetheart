import React from 'react';
import { Lock, Heart } from 'lucide-react';

export function LettersGridView({
  alphabet,
  isUnlocked,
  isCompleted,
  onSelectLetter,
}) {
  return (
    <div className="letters-grid-container">
      <div className="view-intro-banner">
        <h2>All 26 Letters of Our Journey</h2>
        <p>Each stamp holds a treasured memory and heartfelt compliment.</p>
      </div>

      <div className="letters-stamp-grid">
        {alphabet.map((item) => {
          const unlocked = isUnlocked(item.letter);
          const completed = isCompleted(item.letter);

          return (
            <button
              key={item.letter}
              type="button"
              className={`stamp-envelope-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
              onClick={() => unlocked && onSelectLetter(item.letter)}
              disabled={!unlocked}
              aria-label={`Letter ${item.letter}: ${unlocked ? item.word : 'Locked'}`}
            >
              <div className="stamp-perforated-border" />
              <div className="stamp-inner-content">
                <span className="stamp-letter">{item.letter}</span>
                <span className="stamp-word">{unlocked ? item.word : '••••••'}</span>

                <div className="stamp-status-badge">
                  {!unlocked && <Lock size={12} className="lock-icon" />}
                  {completed && <Heart size={12} fill="currentColor" className="heart-icon" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
