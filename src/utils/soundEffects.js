/**
 * Web Audio API procedural sound engine
 * Creates charming, gentle music box notes and storybook chimes
 * without requiring external audio files.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isAmbientPlaying = false;
    this.ambientTimer = null;
    this.ambientStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.isAmbientPlaying) {
      this.stopAmbientMusic();
    }
  }

  // Soft music box chime for unlocks & letter clicks
  playChime(pitch = 523.25) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

      // Bell-like harmonic
      const harmonic = this.ctx.createOscillator();
      const harmonicGain = this.ctx.createGain();
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(pitch * 2, this.ctx.currentTime);
      harmonicGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      harmonicGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      harmonic.connect(harmonicGain);
      harmonicGain.connect(this.ctx.destination);

      osc.start();
      harmonic.start();

      osc.stop(this.ctx.currentTime + 1.7);
      harmonic.stop(this.ctx.currentTime + 1.7);
    } catch {
      // Audio autoplay policy or failure handled gracefully
    }
  }

  // Multi-note celebratory flourish
  playUnlockFlourish() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq);
      }, idx * 140);
    });
  }

  // Gentle ambient music box melody loop
  startAmbientMusic() {
    if (this.isMuted) return;
    this.init();
    this.isAmbientPlaying = true;

    // Romantic music-box pentatonic progression (C, D, E, G, A, C)
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      587.33, 783.99, 880.00, 783.99,
      523.25, 659.25, 1046.5, 880.00,
      783.99, 659.25, 587.33, 523.25
    ];

    const playNext = () => {
      if (!this.isAmbientPlaying || this.isMuted) return;
      const freq = melody[this.ambientStep % melody.length];
      this.playChime(freq);
      this.ambientStep++;
      // Gentle pacing
      this.ambientTimer = setTimeout(playNext, 1800);
    };

    playNext();
  }

  stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  toggleAmbientMusic() {
    if (this.isAmbientPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();
