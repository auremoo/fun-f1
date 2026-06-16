import { useState, useRef } from 'react';

export const useReactionTimer = () => {
  const [reactionTime, setReactionTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [jumpStartDetected, setJumpStartDetected] = useState(false);
  const startTimeRef = useRef(null);
  const canClickRef = useRef(false);

  const startTimer = () => {
    setReactionTime(null);
    setJumpStartDetected(false);
    setIsActive(true);
    startTimeRef.current = null;
    canClickRef.current = false;
  };

  const activateClick = () => {
    startTimeRef.current = performance.now();
    canClickRef.current = true;
  };

  const recordReaction = () => {
    if (!isActive) return;

    if (!canClickRef.current) {
      setJumpStartDetected(true);
      setIsActive(false);
      setReactionTime(-1);
      return;
    }

    if (startTimeRef.current) {
      const time = performance.now() - startTimeRef.current;
      setReactionTime(Math.max(0, time));
      setIsActive(false);
    }
  };

  const reset = () => {
    setReactionTime(null);
    setIsActive(false);
    setJumpStartDetected(false);
    startTimeRef.current = null;
    canClickRef.current = false;
  };

  return {
    reactionTime,
    isActive,
    jumpStartDetected,
    canClick: canClickRef.current,
    startTimer,
    activateClick,
    recordReaction,
    reset,
  };
};
