import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConstellationMap } from './components/ConstellationMap';
import { DiscoveryPanel } from './components/DiscoveryPanel';
import { LettersGridView } from './components/LettersGridView';
import { JournalView } from './components/JournalView';
import { SettingsView } from './components/SettingsView';
import { FinalSurprise } from './components/FinalSurprise';
import { alphabet } from './data/alphabet';
import { useJourneyProgress } from './hooks/useJourneyProgress';

export function App() {
  const {
    unlockedLetters,
    activeLetter,
    isUnlocked,
    isCompleted,
    selectLetter,
    completeAndNext,
    resetJourney,
    totalDiscovered,
    isFinalCelebrationOpen,
    setIsFinalCelebrationOpen,
  } = useJourneyProgress();

  const [currentView, setCurrentView] = useState('map');
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(true);

  // Active letter data
  const currentLetterData = alphabet.find((item) => item.letter === activeLetter) || alphabet[0];
  const isLastLetter = activeLetter === 'Z';
  const isCurrentCompleted = isCompleted(activeLetter);

  const handleSelectLetter = (letter) => {
    const success = selectLetter(letter);
    if (success) {
      setCurrentView('map');
      setIsMobilePanelOpen(true);
    }
  };

  const handleContinue = (letter) => {
    completeAndNext(letter);
  };

  return (
    <div className="storybook-app-root">
      {/* Three-panel main desktop composition */}
      <div className="storybook-layout-grid">
        {/* Left Column: Sidebar & Navigation */}
        <Sidebar
          totalLetters={alphabet.length}
          discoveredCount={totalDiscovered}
          currentView={currentView}
          onChangeView={(view) => setCurrentView(view)}
          onResetJourney={resetJourney}
        />

        {/* Center Column: Main Exploration Area */}
        <main className="main-content-column">
          {currentView === 'map' && (
            <ConstellationMap
              letters={alphabet}
              activeLetter={activeLetter}
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              onSelectLetter={handleSelectLetter}
            />
          )}

          {currentView === 'letters' && (
            <LettersGridView
              alphabet={alphabet}
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              onSelectLetter={handleSelectLetter}
            />
          )}

          {currentView === 'journal' && (
            <JournalView
              alphabet={alphabet}
              unlockedLetters={unlockedLetters}
              onSelectLetter={handleSelectLetter}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView onResetJourney={resetJourney} />
          )}
        </main>

        {/* Right Column: Discovery Card (Desktop) & Responsive Drawer (Mobile) */}
        {currentView === 'map' && (
          <div className={`discovery-panel-container ${isMobilePanelOpen ? 'mobile-open' : 'mobile-closed'}`}>
            <DiscoveryPanel
              letterData={currentLetterData}
              isLastLetter={isLastLetter}
              isCompleted={isCurrentCompleted}
              onContinue={handleContinue}
              onClose={() => setIsMobilePanelOpen(false)}
              onOpenFinalSurprise={() => setIsFinalCelebrationOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Mobile Floating Button to re-open discovery card if closed */}
      {currentView === 'map' && !isMobilePanelOpen && (
        <button
          type="button"
          className="mobile-reopen-card-btn"
          onClick={() => setIsMobilePanelOpen(true)}
          aria-label="Open letter details"
        >
          <span>Letter {activeLetter} Details ♡</span>
        </button>
      )}

      {/* Full-Screen Final Z Celebration */}
      {isFinalCelebrationOpen && (
        <FinalSurprise
          onClose={() => setIsFinalCelebrationOpen(false)}
          onReplay={resetJourney}
        />
      )}
    </div>
  );
}

export default App;
