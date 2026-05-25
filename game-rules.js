/**
 * F1 Arcade - Règles et Scoring
 */

export const GAME_RULES = {
  reaction: {
    title: "Reaction Game",
    objective: "Mesurez votre temps de réaction au feu vert",

    rules: [
      "5 feux rouges s'allument séquentiellement (1 par 1 seconde)",
      "Attendre l'extinction aléatoire des feux (1-4 secondes)",
      "Cliquer sur GO! dès que les feux s'éteignent",
      "Cliquer avant l'extinction = FAUX DÉPART (Jump Start)",
      "Temps enregistré avec précision 0.001ms",
    ],

    scoring: {
      excellence: {
        condition: "< 200ms",
        label: "✓ EXCELLENT",
        description: "Au niveau d'un pilote F1 professionnel",
        color: "text-f1-green",
      },
      good: {
        condition: "≥ 200ms",
        label: "○ BON",
        description: "Réaction rapide mais pas F1",
        color: "text-yellow-400",
      },
      jumpStart: {
        condition: "Avant extinction",
        label: "⚠️ FAUX DÉPART",
        description: "Vous avez cliqué trop tôt",
        color: "text-f1-red",
      },
    },

    records: {
      storage_key: "f1_high_score",
      format: "millisecondes (ms)",
      baseline: 200, // F1 average
    },
  },

  tyre: {
    title: "Tyre Manager",
    objective: "Maintenez les pneus dans la zone optimale",

    rules: [
      "Les pneus montent progressivement en température",
      "Cliquer sur un pneu pour le refroidir (-15°C)",
      "Maintenir chaque pneu entre 80°C et 105°C",
      "Difficulté augmente toutes les 30 secondes",
      "Game Over si un pneu atteint 120°C",
      "Meilleur score sauvegardé",
    ],

    temperature_zones: {
      cold: {
        min: 0,
        max: 60,
        label: "TROP FROID",
        color: "bg-blue-600",
        points: 0,
        description: "Pneus froids = adhérence faible",
      },
      warm: {
        min: 60,
        max: 80,
        label: "RÉCHAUFFEMENT",
        color: "bg-yellow-500",
        points: 5,
        description: "Pneus qui se réchauffent",
      },
      optimal: {
        min: 80,
        max: 105,
        label: "ZONE OPTIMALE",
        color: "bg-green-500",
        points: 10,
        description: "Adhérence maximale",
      },
      hot: {
        min: 105,
        max: 115,
        label: "TROP CHAUD",
        color: "bg-orange-500",
        points: 2,
        description: "Dégradation des pneus",
      },
      critical: {
        min: 115,
        max: 120,
        label: "CRITIQUE",
        color: "bg-f1-red",
        points: -10,
        description: "Dernier avertissement",
      },
      gameover: {
        min: 120,
        max: 150,
        label: "DESTROYED",
        color: "bg-red-900",
        points: 0,
        description: "Pneu détruit - Game Over!",
      },
    },

    scoring: {
      in_optimal_zone: 10, // points par tick (0.5s)
      out_optimal_zone: 2, // points si hors zone
      level_multiplier: 1.5, // augmentation par niveau
      time_to_next_level: 30, // secondes
    },

    difficulty: [
      {
        level: 1,
        temp_increase: 0.5,
        description: "Facile - Pneus montent lentement",
      },
      {
        level: 2,
        temp_increase: 1.1,
        description: "Normal - Augmentation régulière",
      },
      {
        level: 3,
        temp_increase: 1.7,
        description: "Difficile - Réaction rapide requise",
      },
      {
        level: 4,
        temp_increase: 2.3,
        description: "Très difficile - Pilote expérimenté",
      },
      {
        level: 5,
        temp_increase: 3.0,
        description: "Extrême - Gestion chaotique",
      },
    ],

    records: {
      storage_key: "f1_tyre_high_score",
      format: "points",
      baseline: 0,
    },
  },
};

/**
 * Formules de calcul
 */
export const SCORING_FORMULAS = {
  /**
   * Évalue le temps de réaction
   */
  evaluateReactionTime: (timeMs) => {
    const baseline = 200; // F1 average

    if (timeMs < 100) return { category: "superhuman", multiplier: 2 };
    if (timeMs < baseline) return { category: "excellent", multiplier: 1.5 };
    if (timeMs < 300) return { category: "good", multiplier: 1 };
    if (timeMs < 500) return { category: "average", multiplier: 0.8 };
    return { category: "slow", multiplier: 0.5 };
  },

  /**
   * Calcule le score tyre sur le temps écoulé
   */
  calculateTyreScore: (timeSeconds, level, inOptimalZone) => {
    const baseScore = inOptimalZone ? 10 : 2;
    const levelBonus = level * 1.5;
    return Math.floor(baseScore * levelBonus * (1 + timeSeconds * 0.02));
  },

  /**
   * Température progressive pour un pneu
   */
  calculateTireTemperature: (
    currentTemp,
    baseIncrease,
    level,
    randomFactor,
  ) => {
    const increase = baseIncrease * (1 + level * 0.5) + randomFactor * 0.5;
    return Math.min(currentTemp + increase, 150);
  },
};

/**
 * Comparaisons et statistiques
 */
export const COMPARISONS = {
  reactionTime: {
    superhuman: {
      min: 0,
      max: 100,
      description: "Superhuman reaction - 🔥",
      emoji: "⚡",
    },
    excellent: {
      min: 100,
      max: 200,
      description: "F1 Pilot level",
      emoji: "🏆",
    },
    good: {
      min: 200,
      max: 300,
      description: "Amateur racing level",
      emoji: "✓",
    },
    average: {
      min: 300,
      max: 500,
      description: "Average human",
      emoji: "○",
    },
    slow: {
      min: 500,
      max: 10000,
      description: "Slow reaction - Keep practicing!",
      emoji: "🐢",
    },
  },
};

/**
 * Achievements (futur)
 */
export const ACHIEVEMENTS = [
  {
    id: "first_blood",
    name: "Premier Essai",
    description: "Complètez votre premier jeu de réaction",
    icon: "🏁",
    unlocked: false,
  },
  {
    id: "reaction_master",
    name: "Maître de la Réaction",
    description: "Obtenez < 150ms de temps de réaction",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "no_jump_starts",
    name: "Départ Parfait",
    description: "Complètez 10 jeux sans faux départ",
    icon: "✓",
    unlocked: false,
  },
  {
    id: "tyre_master",
    name: "Gestionnaire de Pneus",
    description: "Atteignez le niveau 5 en Tyre Manager",
    icon: "🔥",
    unlocked: false,
  },
  {
    id: "high_score",
    name: "Nouveau Record",
    description: "Établissez votre premier record personnel",
    icon: "🏆",
    unlocked: false,
  },
];
