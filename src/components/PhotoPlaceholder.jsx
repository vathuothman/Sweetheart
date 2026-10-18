import React, { useState, useEffect } from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';

export function PhotoPlaceholder({ src, alt, caption }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const showImage = Boolean(src) && !hasError;

  return (
    <div className="polaroid-frame-wrapper">
      <div className="polaroid-frame">
        {/* Decorative Washi Tape on opposite corners */}
        <div className="washi-tape washi-tape-left" aria-hidden="true" />
        <div className="washi-tape washi-tape-right" aria-hidden="true" />

        <div className="polaroid-photo-area">
          {showImage ? (
            <img
              key={src}
              src={src}
              alt={alt || "Special memory"}
              className={`polaroid-img ${isLoaded ? 'loaded' : ''}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="designed-placeholder" role="img" aria-label="Photo placeholder">
              <div className="placeholder-inner">
                <div className="placeholder-icon-circle">
                  <Camera className="placeholder-camera-icon" size={26} />
                  <Heart className="placeholder-heart-badge" size={14} />
                </div>
                <p className="placeholder-primary-text">Your photo will go here</p>
                <p className="placeholder-sub-text">A special moment reserved for us</p>
                <div className="placeholder-stars" aria-hidden="true">
                  <Sparkles size={13} className="sparkle-1" />
                  <span className="star-dot">✦</span>
                  <Sparkles size={11} className="sparkle-2" />
                </div>
              </div>
            </div>
          )}
        </div>

        {caption && (
          <div className="polaroid-caption">
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
