import React from 'react';
import { LetterNode } from './LetterNode';
import { nodeCoordinates } from '../data/nodeCoordinates';

export function ConstellationMap({
  letters,
  activeLetter,
  isUnlocked,
  isCompleted,
  onSelectLetter,
}) {
  return (
    <div className="constellation-map-container">
      {/* Background Illustrated Scene */}
      <div className="map-artwork-canvas">
        <img
          src="/images/center-map.jpg"
          alt="Magical floating islands and starry sky"
          className="map-background-img"
        />

        {/* Storybook Whimsical Banner Quote */}
        <div className="storybook-map-quote" aria-hidden="true">
          <span>Small letters...</span>
          <span className="quote-sub">Big feelings... ♡</span>
        </div>

        {/* SVG Constellation Path Lines connecting the nodes */}
        <svg className="constellation-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="unlockedLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#87449A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Draw connecting segments between adjacent letters */}
          {letters.map((item, idx) => {
            if (idx === letters.length - 1) return null;
            const nextItem = letters[idx + 1];
            const p1 = nodeCoordinates[item.letter];
            const p2 = nodeCoordinates[nextItem.letter];
            if (!p1 || !p2) return null;

            const bothUnlocked = isUnlocked(item.letter) && isUnlocked(nextItem.letter);

            return (
              <line
                key={`line-${item.letter}-${nextItem.letter}`}
                x1={`${p1.x}`}
                y1={`${p1.y}`}
                x2={`${p2.x}`}
                y2={`${p2.y}`}
                stroke={bothUnlocked ? "url(#unlockedLineGrad)" : "rgba(255, 255, 255, 0.35)"}
                strokeWidth={bothUnlocked ? "0.6" : "0.4"}
                strokeDasharray={bothUnlocked ? "none" : "1.2, 1.2"}
                filter={bothUnlocked ? "url(#glowFilter)" : undefined}
                className={bothUnlocked ? "glowing-line" : "locked-line"}
              />
            );
          })}
        </svg>

        {/* 26 Interactive Letter Nodes */}
        {letters.map((item) => {
          const coords = nodeCoordinates[item.letter] || { x: 50, y: 50 };
          return (
            <LetterNode
              key={item.letter}
              letter={item.letter}
              word={item.word}
              x={coords.x}
              y={coords.y}
              isUnlocked={isUnlocked(item.letter)}
              isCompleted={isCompleted(item.letter)}
              isActive={activeLetter === item.letter}
              onSelect={onSelectLetter}
            />
          );
        })}
      </div>
    </div>
  );
}
