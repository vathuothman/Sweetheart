import React from 'react';
import { Lock, Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export function LetterNode({
  letter,
  word,
  x,
  y,
  isUnlocked,
  isCompleted,
  isActive,
  onSelect,
}) {
  const handleClick = () => {
    if (isUnlocked) {
      soundEngine.playChime(isActive ? 587.33 : 659.25);
      onSelect(letter);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const statusClass = !isUnlocked
    ? 'node-locked'
    : isActive
    ? 'node-active'
    : isCompleted
    ? 'node-completed'
    : 'node-available';

  const tooltipText = isUnlocked
    ? `${letter} · ${word}`
    : `Letter ${letter} (Locked)`;

  return (
    <div
      className={`letter-node-container ${statusClass}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Radiant glow ring for active node */}
      {isActive && (
        <div className="active-glow-aura" aria-hidden="true">
          <span className="pulse-ring ring-1" />
          <span className="pulse-ring ring-2" />
          <Sparkles className="sparkle-star star-tl" size={14} />
          <Sparkles className="sparkle-star star-br" size={12} />
        </div>
      )}

      <button
        type="button"
        className="letter-node-btn"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={!isUnlocked}
        aria-label={`${letter}: ${isUnlocked ? word : 'Locked'}`}
        aria-current={isActive ? 'true' : undefined}
        title={tooltipText}
      >
        <span className="letter-text">{letter}</span>

        {!isUnlocked && (
          <span className="node-lock-icon" aria-hidden="true">
            <Lock size={10} strokeWidth={2.4} />
          </span>
        )}

        {isCompleted && !isActive && (
          <span className="node-completed-heart" aria-hidden="true">
            <Heart size={8} fill="currentColor" />
          </span>
        )}
      </button>

      {/* Floating gentle tooltip on hover */}
      <div className="node-hover-label" aria-hidden="true">
        <span className="label-letter">{letter}</span>
        {isUnlocked && <span className="label-word"> · {word}</span>}
      </div>
    </div>
  );
}
