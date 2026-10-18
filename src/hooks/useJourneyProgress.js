import { useState, useEffect, useCallback } from 'react';
import { alphabet } from '../data/alphabet';

const STORAGE_KEY = 'sweetheart_journey_progress_v1';

export function useJourneyProgress() {
  // Load initial state safely from localStorage
  const [unlockedLetters, setUnlockedLetters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.unlocked) && parsed.unlocked.length > 0) {
          return parsed.unlocked;
        }
      }
    } catch (e) {
      console.warn('Could not read progress from localStorage:', e);
    }
    return ['A'];
  });

  const [completedLetters, setCompletedLetters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completed)) {
          return parsed.completed;
        }
      }
    } catch (e) {
      console.warn('Could not read completed from localStorage:', e);
    }
    return [];
  });

  const [activeLetter, setActiveLetter] = useState('A');
  const [isFinalCelebrationOpen, setIsFinalCelebrationOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          unlocked: unlockedLetters,
          completed: completedLetters,
          lastActive: activeLetter,
        })
      );
    } catch (e) {
      console.warn('Could not save progress to localStorage:', e);
    }
  }, [unlockedLetters, completedLetters, activeLetter]);

  // Check if a letter is unlocked
  const isUnlocked = useCallback(
    (letter) => unlockedLetters.includes(letter),
    [unlockedLetters]
  );

  // Check if a letter is completed
  const isCompleted = useCallback(
    (letter) => completedLetters.includes(letter),
    [completedLetters]
  );

  // Select a letter to view
  const selectLetter = useCallback(
    (letter) => {
      if (isUnlocked(letter)) {
        setActiveLetter(letter);
        return true;
      }
      return false;
    },
    [isUnlocked]
  );

  // Complete current letter and unlock the next one
  const completeAndNext = useCallback(
    (currentLetter) => {
      const currentIndex = alphabet.findIndex((item) => item.letter === currentLetter);
      if (currentIndex === -1) return;

      // Mark current as completed if not already
      setCompletedLetters((prev) =>
        prev.includes(currentLetter) ? prev : [...prev, currentLetter]
      );

      // Check if this is the final letter (Z)
      if (currentIndex === alphabet.length - 1) {
        setIsFinalCelebrationOpen(true);
        return;
      }

      // Unlock next letter
      const nextItem = alphabet[currentIndex + 1];
      if (nextItem) {
        setUnlockedLetters((prev) =>
          prev.includes(nextItem.letter) ? prev : [...prev, nextItem.letter]
        );
        setActiveLetter(nextItem.letter);
      }
    },
    []
  );

  // Reset journey with safety confirmation
  const resetJourney = useCallback(() => {
    setUnlockedLetters(['A']);
    setCompletedLetters([]);
    setActiveLetter('A');
    setIsFinalCelebrationOpen(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
  }, []);

  const totalDiscovered = completedLetters.length;

  return {
    unlockedLetters,
    completedLetters,
    activeLetter,
    setActiveLetter,
    isUnlocked,
    isCompleted,
    selectLetter,
    completeAndNext,
    resetJourney,
    totalDiscovered,
    isFinalCelebrationOpen,
    setIsFinalCelebrationOpen,
  };
}
