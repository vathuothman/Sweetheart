import React from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { PhotoPlaceholder } from './PhotoPlaceholder';
import { soundEngine } from '../utils/soundEffects';

export function DiscoveryPanel({
  letterData,
  isLastLetter,
  isCompleted,
  onContinue,
  onClose,
  onOpenFinalSurprise,
}) {
  if (!letterData) return null;

  const handleContinueClick = () => {
    soundEngine.playUnlockFlourish();
    if (isLastLetter && isCompleted) {
      if (onOpenFinalSurprise) onOpenFinalSurprise();
    } else {
      onContinue(letterData.letter);
    }
  };

  return (
    <aside className="discovery-panel-wrapper" aria-label={`Details for Letter ${letterData.letter}`}>
      <div className="discovery-parchment-card">
        {/* Cute satin ribbon bow pinned at top right */}
        <div className="card-ribbon-bow" aria-hidden="true">
          <svg viewBox="0 0 60 50" className="ribbon-svg">
            <path
              d="M30 22 C22 10, 5 12, 10 26 C14 34, 26 28, 30 25 C34 28, 46 34, 50 26 C55 12, 38 10, 30 22 Z"
              fill="#87449A"
              stroke="#692f7a"
              strokeWidth="1.5"
            />
            <circle cx="30" cy="24" r="5" fill="#522160" />
            <path
              d="M27 27 C24 38, 16 48, 12 50 M33 27 C36 38, 44 48, 48 50"
              stroke="#87449A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Back to Map button */}
        <button
          type="button"
          onClick={onClose}
          className="back-to-map-btn"
          aria-label="Back to constellation map"
        >
          <ArrowLeft size={16} />
          <span>Back to map</span>
        </button>

        {/* Letter & Title Header */}
        <div className="letter-card-header">
          <div className="letter-symbol-row">
            <span className="doodle-heart tl" aria-hidden="true">♡</span>
            <span className="big-letter-display">{letterData.letter}</span>
            <span className="doodle-heart tr" aria-hidden="true">♡</span>
          </div>

          <h2 className="letter-word-title">{letterData.word}</h2>
          <div className="hand-drawn-underline" aria-hidden="true" />
        </div>

        {/* Polaroid Memory Photo */}
        <div className="letter-photo-section">
          <PhotoPlaceholder
            src={letterData.image}
            alt={`Memory for ${letterData.letter}`}
            caption={letterData.caption}
          />
        </div>

        {/* Pink Post-It / Washi Reply Note */}
        <div className="my-reply-sticky-note">
          <div className="sticky-tape" aria-hidden="true" />
          <div className="sticky-note-header">
            <Heart size={14} className="reply-heart-icon" fill="currentColor" />
            <span className="reply-label">My reply:</span>
          </div>
          <p className="reply-body-text">
            {letterData.response}
          </p>
        </div>

        {/* Continue Action Button */}
        <div className="card-actions-row">
          <button
            type="button"
            className="continue-journey-btn"
            onClick={handleContinueClick}
          >
            <span>
              {isLastLetter
                ? (isCompleted ? "Open our final surprise ✨" : "Finish our journey ♡")
                : "Continue our journey"}
            </span>
            {isLastLetter ? <Sparkles size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
