import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Volume2, X, RotateCcw } from 'lucide-react';
import { finalMessage, finalAudio } from '../data/alphabet';

export function FinalSurprise({ onClose, onReplay }) {
  useEffect(() => {
    // Launch celebratory confetti burst of soft romantic colors
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f472b6', '#fb7185', '#fde047', '#fed7aa', '#e9d5ff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="final-celebration-backdrop" role="dialog" aria-modal="true" aria-label="Final Surprise Celebration">
      <div className="celebration-content-wrap">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="celebration-close-btn"
          aria-label="Close celebration"
        >
          <X size={20} />
        </button>

        {/* Glowing Heart Constellation Emblem */}
        <div className="celestial-heart-crest" aria-hidden="true">
          <div className="heart-halo-glow" />
          <Heart size={44} className="crest-heart-icon" fill="currentColor" />
          <Sparkles size={22} className="crest-sparkle-1" />
          <Sparkles size={18} className="crest-sparkle-2" />
        </div>

        <h2 className="celebration-heading">
          All 26 Letters Discovered <span className="pink-heart">♡</span>
        </h2>
        <p className="celebration-subhead">
          You have unlocked our entire little universe.
        </p>

        {/* Unfolded Storybook Letter */}
        <div className="wax-sealed-letter-card">
          <div className="wax-seal-badge" aria-hidden="true">
            <span>♡</span>
          </div>

          <div className="parchment-letter-body">
            {finalMessage.split('\n\n').map((paragraph, index) => (
              <p key={index} className="letter-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Optional Audio / Voice Note Player if provided */}
          {finalAudio && (
            <div className="audio-voice-note-section">
              <div className="audio-note-label">
                <Volume2 size={16} />
                <span>Listen to a personal voice note:</span>
              </div>
              <audio controls src={finalAudio} className="custom-audio-player">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {/* Replay or Revisit actions */}
        <div className="celebration-actions">
          <button
            type="button"
            className="revisit-map-btn"
            onClick={onClose}
          >
            <span>Revisit Letters on Map</span>
          </button>

          <button
            type="button"
            className="replay-journey-btn"
            onClick={onReplay}
          >
            <RotateCcw size={15} />
            <span>Start Fresh Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
