/**
 * Hook personnalisé pour la synthèse sonore Web Audio API
 * Génère des bips FIA sans latence fichier
 */
export const useF1Audio = () => {
  const audioContextRef =
    typeof window !== "undefined"
      ? new (window.AudioContext || window.webkitAudioContext)()
      : null;

  const initAudioContext = () => audioContextRef;

  /**
   * Joue un bip de feu rouge (760 Hz, 200ms)
   */
  const playRedLight = (delay = 0) => {
    if (!audioContextRef) return;
    const ctx = audioContextRef;
    const startTime = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 760;
    osc.type = "sine";

    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  };

  /**
   * Joue un bip d'extinction (1200 Hz, 150ms)
   */
  const playExtinction = (delay = 0) => {
    if (!audioContextRef) return;
    const ctx = audioContextRef;
    const startTime = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1200;
    osc.type = "sine";

    gain.gain.setValueAtTime(0.35, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  };

  /**
   * Joue un bip d'erreur (300 Hz, 400ms)
   */
  const playError = (delay = 0) => {
    if (!audioContextRef) return;
    const ctx = audioContextRef;
    const startTime = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 300;
    osc.type = "sine";

    gain.gain.setValueAtTime(0.4, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

    osc.start(startTime);
    osc.stop(startTime + 0.4);
  };

  /**
   * Joue un bip de succès (1600 Hz, 250ms)
   */
  const playSuccess = (delay = 0) => {
    if (!audioContextRef) return;
    const ctx = audioContextRef;
    const startTime = ctx.currentTime + delay;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1600;
    osc.type = "sine";

    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  };

  return {
    playRedLight,
    playExtinction,
    playError,
    playSuccess,
    audioContext: audioContextRef,
  };
};
