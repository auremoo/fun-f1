/**
 * Constantes globales F1 Arcade
 */

export const F1_CONSTANTS = {
  // Temps de réaction
  AVERAGE_PILOT_REACTION: 200, // ms
  MIN_REACTION_TIME: 50, // ms (limite physique)
  MAX_REACTION_TIME: 1000, // ms

  // Feux de départ
  LIGHT_SEQUENCE_INTERVAL: 1000, // ms (intervalle entre les feux)
  EXTINCTION_MIN_DELAY: 1000, // ms (délai min avant extinction)
  EXTINCTION_MAX_DELAY: 4000, // ms (délai max avant extinction)

  // Fréquences audio (Hz)
  FREQUENCY_RED_LIGHT: 760,
  FREQUENCY_EXTINCTION: 1200,
  FREQUENCY_ERROR: 300,
  FREQUENCY_SUCCESS: 1600,

  // Durées audio (ms)
  DURATION_RED_LIGHT: 200,
  DURATION_EXTINCTION: 150,
  DURATION_ERROR: 400,
  DURATION_SUCCESS: 250,

  // Pneus
  TYRE_MIN_TEMP: 40, // °C
  TYRE_OPTIMAL_MIN: 80, // °C
  TYRE_OPTIMAL_MAX: 105, // °C
  TYRE_MAX_TEMP: 120, // °C (Game Over)
  TYRE_COOLING_AMOUNT: 15, // °C
  TYRE_UPDATE_INTERVAL: 500, // ms

  // Scoring
  SCORE_IN_GREEN_ZONE: 10,
  SCORE_OUT_ZONE: 2,
  DIFFICULTY_INCREASE_INTERVAL: 30, // s

  // LocalStorage keys
  STORAGE_REACTION_HIGH_SCORE: "f1_high_score",
  STORAGE_TYRE_HIGH_SCORE: "f1_tyre_high_score",
};

/**
 * Couleurs du thème
 */
export const THEME_COLORS = {
  dark: "#0b0b0b",
  red: "#e10600",
  green: "#22c55e",
  yellow: "#ffcc00",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
};

/**
 * Messages et labels
 */
export const UI_TEXT = {
  REACTION: {
    TITLE: "F1 REACTION",
    SUBTITLE: "Appuyez quand les feux s'éteignent",
    JUMPSTART: "⚠️ FAUX DÉPART (Jump Start)!",
    EXCELLENT: "✓ EXCELLENT",
    GOOD: "○ BON",
    NEW_RECORD: "🏆 NOUVEAU RECORD!",
    AVERAGE_F1: "Moyenne F1: 200ms",
    BEST_TIME: "MEILLEUR TEMPS",
  },

  TYRE: {
    TITLE: "TYRE MANAGER",
    SUBTITLE: "Maintenez les pneus entre 80°C et 105°C",
    OPTIMAL_ZONE: "Zone optimale: 80-105°C",
    GAME_OVER: "GAME OVER",
    OVERHEATED: "Un pneu a surchauffé!",
    BEST_SCORE: "MEILLEUR SCORE",
  },
};
