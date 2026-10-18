import React, { useState } from 'react';
import { Map, Mail, BookOpen, Settings, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export function Sidebar({
  totalLetters = 26,
  discoveredCount = 1,
  currentView = 'map',
  onChangeView,
  onResetJourney,
}) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const progressPercent = Math.min(100, Math.round((discoveredCount / totalLetters) * 100));

  const handleToggleAudio = () => {
    const isPlaying = soundEngine.toggleAmbientMusic();
    setIsAudioPlaying(isPlaying);
  };

  const handleConfirmReset = () => {
    onResetJourney();
    setShowResetConfirm(false);
  };

  return (
    <nav className="journal-sidebar" aria-label="Journal navigation and journey progress">
      <div className="sidebar-paper-content">
        {/* Header Branding */}
        <div className="sidebar-header">
          <h1 className="sidebar-title">
            Our Little <br /> Universe <span className="heart-doodle">♡</span>
          </h1>
          <p className="sidebar-subtitle">
            A journey for you <span className="sparkle-doodle">✨</span>
          </p>
        </div>

        {/* Taped Sticky Note */}
        <div className="taped-journal-note">
          <div className="note-tape-strip" aria-hidden="true" />
          <p className="note-quote">
            Every letter holds a little piece of you. <span className="mini-heart">♡</span>
          </p>
        </div>

        {/* Journey Progress Bar */}
        <div className="journey-progress-section">
          <div className="progress-header-row">
            <span className="progress-label">Your Journey ♡</span>
          </div>

          <div
            className="progress-bar-track"
            role="progressbar"
            aria-valuenow={discoveredCount}
            aria-valuemin={0}
            aria-valuemax={totalLetters}
            aria-label={`${discoveredCount} of ${totalLetters} letters discovered`}
          >
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="progress-count-text">
            {discoveredCount} / {totalLetters} discovered
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="sidebar-nav-list" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'map'}
            className={`nav-tab-btn ${currentView === 'map' ? 'active' : ''}`}
            onClick={() => onChangeView('map')}
          >
            <Map size={18} className="nav-icon" />
            <span>Map</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'letters'}
            className={`nav-tab-btn ${currentView === 'letters' ? 'active' : ''}`}
            onClick={() => onChangeView('letters')}
          >
            <Mail size={18} className="nav-icon" />
            <span>Letters</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'journal'}
            className={`nav-tab-btn ${currentView === 'journal' ? 'active' : ''}`}
            onClick={() => onChangeView('journal')}
          >
            <BookOpen size={18} className="nav-icon" />
            <span>Journal</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'settings'}
            className={`nav-tab-btn ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => onChangeView('settings')}
          >
            <Settings size={18} className="nav-icon" />
            <span>Settings</span>
          </button>
        </div>

        {/* Ambient Sound & Quick Controls */}
        <div className="ambient-sound-widget">
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`ambient-toggle-btn ${isAudioPlaying ? 'playing' : ''}`}
            title={isAudioPlaying ? 'Pause music box melody' : 'Play soft music box melody'}
            aria-label={isAudioPlaying ? 'Pause music box' : 'Play music box'}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="sound-label">
              {isAudioPlaying ? 'Melody playing ♫' : 'Music box sound'}
            </span>
            {isAudioPlaying && <Sparkles size={13} className="ambient-sparkle" />}
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="discreet-reset-btn"
            title="Restart journey"
            aria-label="Restart journey"
          >
            <RotateCcw size={13} />
            <span>Restart</span>
          </button>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="reset-modal-backdrop" role="dialog" aria-modal="true">
            <div className="reset-modal-card">
              <h3>Restart Journey?</h3>
              <p>This will return you to letter A so you can experience the unlock path from the beginning.</p>
              <div className="reset-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Keep my place
                </button>
                <button
                  type="button"
                  className="modal-confirm-btn"
                  onClick={handleConfirmReset}
                >
                  Restart from A
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Botanical Note */}
        <div className="sidebar-footer-botanical">
          <div className="botanical-sketch" aria-hidden="true">
            <svg viewBox="0 0 100 40" className="flower-svg">
              <path
                d="M10 35 Q30 20 50 35 T90 35 M30 25 C30 15 40 15 40 25 M60 25 C60 15 70 15 70 25"
                fill="none"
                stroke="#d1a098"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="35" cy="18" r="3" fill="#fbcfe8" />
              <circle cx="65" cy="18" r="3" fill="#fbcfe8" />
            </svg>
          </div>
          <p className="footer-love-note">
            Thank you <br /> for being you <span className="mini-heart">♡</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
