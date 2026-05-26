import { useRef } from 'react';

export const useF1Audio = () => {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current && typeof window !== 'undefined') {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const playTone = (frequency, duration, gain = 0.3) => {
    const ctx = getCtx();
    if (!ctx) return;

    const startTime = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = 'sine';
    gainNode.gain.setValueAtTime(gain, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const playRedLight = () => playTone(760, 0.2);
  const playExtinction = () => playTone(1200, 0.15, 0.35);
  const playError = () => playTone(300, 0.4, 0.4);
  const playSuccess = () => playTone(1600, 0.25);

  return { playRedLight, playExtinction, playError, playSuccess };
};
