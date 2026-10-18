import React from 'react';
import { Heart } from 'lucide-react';

export function JournalView({ alphabet, unlockedLetters, onSelectLetter }) {
  const unlockedList = alphabet.filter((item) => unlockedLetters.includes(item.letter));

  return (
    <div className="journal-view-container">
      <div className="view-intro-banner">
        <h2>Our Storybook Journal</h2>
        <p>A continuous reading chronicle of every compliment and reply unlocked so far.</p>
      </div>

      <div className="journal-entries-stream">
        {unlockedList.map((item) => (
          <article key={item.letter} className="journal-story-entry">
            <div className="entry-header">
              <span className="entry-letter-badge">{item.letter}</span>
              <div>
                <h3 className="entry-word">{item.word}</h3>
                <span className="entry-caption">{item.caption}</span>
              </div>
            </div>

            <blockquote className="entry-compliment">
              "{item.compliment}"
            </blockquote>

            <div className="entry-reply-snippet">
              <Heart size={13} fill="currentColor" className="text-pink-500" />
              <span><strong>My reply:</strong> {item.response}</span>
            </div>

            <button
              type="button"
              className="view-in-card-link"
              onClick={() => onSelectLetter(item.letter)}
            >
              Open in Discovery Card →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
