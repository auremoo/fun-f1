import { useState, useEffect, useRef } from "react";

/**
 * Hook personnalisé pour le chronomètre de précision au millième de seconde
 * Utilise performance.now() pour une précision maximale
 */
export const useReactionTimer = () => {
  const [reactionTime, setReactionTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [jumpStartDetected, setJumpStartDetected] = useState(false);
  const startTimeRef = useRef(null);
  const canClickRef = useRef(false);

  /**
   * Lance le chronomètre et enregistre le temps de départ
   */
  const startTimer = () => {
    setReactionTime(null);
    setJumpStartDetected(false);
    setIsActive(true);
    startTimeRef.current = null;
    canClickRef.current = false;

    // Délai aléatoire entre 1s et 4s avant de permettre le clic
    const randomDelay = 1000 + Math.random() * 3000;

    setTimeout(() => {
      startTimeRef.current = performance.now();
      canClickRef.current = true;
    }, randomDelay);
  };

  /**
   * Enregistre le temps de réaction quand le joueur clique
   */
  const recordReaction = () => {
    if (!isActive) return;

    if (!canClickRef.current) {
      // Faux départ détecté
      setJumpStartDetected(true);
      setIsActive(false);
      setReactionTime(-1);
      return;
    }

    if (startTimeRef.current) {
      const endTime = performance.now();
      const time = endTime - startTimeRef.current;
      setReactionTime(Math.max(0, time));
      setIsActive(false);
    }
  };

  /**
   * Arrête le chronomètre
   */
  const stopTimer = () => {
    setIsActive(false);
    startTimeRef.current = null;
    canClickRef.current = false;
  };

  /**
   * Réinitialise complètement
   */
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
    recordReaction,
    stopTimer,
    reset,
  };
};
