╔════════════════════════════════════════════════════════════════════════════════╗
║ ║
║ 🏎️ F1 ARCADE - Application Web Haute Performance ║
║ ║
║ Jeu de Réaction FIA avec Synthèse Audio Web Audio API ║
║ ║
╚════════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════════════════════════

📁 STRUCTURE GÉNÉRALE

/fun-f1/
│
├─ 📄 INDEX FICHIERS (ce fichier)
│
├─ 🚀 DÉMARRAGE RAPIDE
│ ├─ setup.bat (Windows) Double-cliquez pour démarrer
│ └─ setup.sh (Mac/Linux) bash setup.sh
│
├─ 📖 DOCUMENTATION
│ ├─ README.md ✨ Guide complet (lire en premier!)
│ ├─ QUICKSTART.md ⚡ Commandes npm & accès app
│ ├─ ARCHITECTURE.md 🏗️ Diagrammes et data flows
│
├─ 🎮 JEUX (Composants)
│ ├─ App.jsx Routing & Navigation (page d'accueil)
│ ├─ ReactionGame.jsx Jeu 1: Temps de réaction
│ └─ TyreGame.jsx Jeu 2: Gestionnaire de pneus
│
├─ ⚙️ LOGIQUE (Hooks & Utilitaires)
│ ├─ useReactionTimer.js Hook: Chronomètre haute précision
│ ├─ useF1Audio.js Hook: Web Audio API (synthèse sonore)
│ ├─ constants.js Constantes globales (couleurs, temps, etc.)
│ ├─ game-rules.js Règles, scoring, achievements
│ └─ test-validation.js Checklist de tests & debug commands
│
├─ 🎨 STYLES & CONFIG
│ ├─ index.css CSS global (Tailwind + custom)
│ ├─ tailwind.config.js Configuration Tailwind (couleurs, shadows)
│ ├─ postcss.config.cjs Configuration PostCSS
│
├─ 📦 PROJECT CONFIG
│ ├─ package.json Dépendances (React, Vite, Tailwind, Lucide)
│ ├─ vite.config.js Configuration Vite (bundler)
│ ├─ .env.example Variables d'environnement exemple
│ └─ .gitignore Git exclusions
│
├─ 🔗 ENTRY POINTS
│ ├─ index.html Page HTML (point d'entrée)
│ └─ main.jsx React entry point (monte App.jsx)
│
└─ 📋 MÉTADONNÉES
└─ plan.md (session) Suivi du projet

═══════════════════════════════════════════════════════════════════════════════════

🚀 DÉMARRAGE EN 3 ÉTAPES

1️⃣ INSTALLATION (première fois)
Windows: Double-cliquez setup.bat
Mac/Linux: bash setup.sh
Manuel: npm install

2️⃣ LANCEMENT
npm run dev
→ Ouvre http://localhost:5173 automatiquement

3️⃣ COMMANDES UTILES
npm run build # Production build
npm run preview # Aperçu du build
npm install # Installer dépendances

═══════════════════════════════════════════════════════════════════════════════════

🎮 LES DEUX JEUX

┌─────────────────────────────────────────────────────────────────────────────┐
│ 1️⃣ REACTION GAME │
├─────────────────────────────────────────────────────────────────────────────┤
│ Fichier: ReactionGame.jsx │
│ Hook: useReactionTimer.js + useF1Audio.js │
│ │
│ Objectif: Mesurez votre temps de réaction au feu vert FIA │
│ │
│ Gameplay: │
│ • 5 feux rouges s'allument 1 par 1 (1 seconde d'intervalle) │
│ • Extinction aléatoire entre 1-4 secondes après le dernier │
│ • Cliquez "GO!" dès que les feux s'éteignent │
│ • Temps affiché avec précision 0.001ms │
│ │
│ Scoring: │
│ ✓ < 200ms → EXCELLENT (niveau F1) │
│ ○ ≥ 200ms → BON (amateur) │
│ ⚠ Avant → JUMP START (faux départ) │
│ │
│ Audio: │
│ • Bip feu rouge: 760Hz │
│ • Bip extinction: 1200Hz │
│ • Bip erreur: 300Hz │
│ • Bip succès: 1600Hz │
│ │
│ Meilleur Score: Sauvegardé dans localStorage ('f1_high_score') │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 2️⃣ TYRE MANAGER │
├─────────────────────────────────────────────────────────────────────────────┤
│ Fichier: TyreGame.jsx │
│ Hook: useF1Audio.js (optionnel pour feedback) │
│ │
│ Objectif: Gérez la température des 4 pneus │
│ │
│ Gameplay: │
│ • Pneus montent progressivement en température │
│ • Cliquez sur un pneu pour le refroidir (-15°C) │
│ • Maintenez chaque pneu entre 80°C et 105°C │
│ • Difficulté augmente tous les 30 secondes │
│ • Game Over si un pneu atteint 120°C │
│ │
│ Zones de Température: │
│ 🔵 Bleu (< 60°C) : Trop froid - Adhérence faible │
│ 🟡 Jaune (60-80°C) : Réchauffement - En route │
│ 🟢 Vert (80-105°C) : OPTIMAL - Adhérence maximale ✓ │
│ 🟠 Orange (105-115°C) : Trop chaud - Dégradation │
│ 🔴 Rouge (> 115°C) : CRITIQUE - Dernier avertissement │
│ │
│ Scoring: │
│ • En zone optimale: +10 points par tick (0.5s) │
│ • Hors zone: +2 points par tick │
│ • Bonus niveau: augmente avec difficulté │
│ │
│ Difficulté: │
│ Niveau 1→5 (auto-augmentation toutes les 30s) │
│ Plus on joue, plus les pneus montent vite │
│ │
│ Meilleur Score: Sauvegardé dans localStorage ('f1_tyre_high_score') │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════════

🛠️ STACK TECHNIQUE

Frontend:
├─ React 18.2 Hooks & functional components
├─ Vite 5.0 Bundler ultra-rapide (< 100KB gzippé)
├─ Tailwind CSS 3.3 Utility-first styling
├─ Lucide React Icons (Play, RotateCcw, etc.)
└─ Web Audio API Synthèse sonore sans latence

Performance:
├─ performance.now() Chrono au 0.001ms (microseconde)
├─ LocalStorage High scores persistants
├─ CSS GPU accel. Animations fluides 60fps
└─ Code splitting Lazy loading Vite

Browser Support:
├─ Chrome/Edge 90+ ✓ Tous les jeux + Audio API
├─ Firefox 88+ ✓ Tous les jeux + Audio API
├─ Safari 14+ ✓ Tous les jeux + Audio API
└─ Mobile Safari ✓ Tous les jeux (Audio user-gated)

═══════════════════════════════════════════════════════════════════════════════════

📊 HOOKS PERSONNALISÉS

┌─ useReactionTimer.js ─────────────────────────────────────────────────────┐
│ Chronomètre haute précision (performance.now()) │
│ │
│ Exports: │
│ • reactionTime number | null Temps mesuré en ms │
│ • jumpStartDetected boolean Faux départ détecté │
│ • canClick boolean Le joueur peut cliquer │
│ • isActive boolean Jeu en cours │
│ • startTimer() () => void Lance la séquence │
│ • recordReaction() () => void Enregistre le temps │
│ • stopTimer() () => void Arrête le chronomètre │
│ • reset() () => void Réinitialise l'état │
│ │
│ Détails: │
│ • Délai aléatoire 1000-4000ms avant permettre le clic │
│ • Détection clic avant délai = Jump Start │
│ • Utilise useRef pour performance.now() sans re-render │
└─────────────────────────────────────────────────────────────────────────────┘

┌─ useF1Audio.js ───────────────────────────────────────────────────────────┐
│ Web Audio API Synthèse sonore (0ms latence) │
│ │
│ Exports: │
│ • playRedLight(delay?) Bip 760Hz × 200ms │
│ • playExtinction(delay?) Bip 1200Hz × 150ms │
│ • playError(delay?) Bip 300Hz × 400ms │
│ • playSuccess(delay?) Bip 1600Hz × 250ms │
│ • audioContext Référence AudioContext │
│ │
│ Détails: │
│ • Créé AudioContext au premier appel (après user interaction) │
│ • Génère sine waves (oscillateurs) directement │
│ • Gain envelope pour fadeout naturel │
│ • Compatible fallback (webkit prefix pour Safari) │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════════

🎨 DESIGN SYSTEM

Couleurs (Tailwind):
├─ f1-dark #0b0b0b Fond principal (très sombre)
├─ f1-red #e10600 Accent primaire (rouge F1)
├─ f1-green #22c55e Succès/Validation
└─ f1-yellow #ffcc00 Alerte/Warning (Pirelli)

Ombres (Glow Effect):
├─ shadow-glow Rouge LED intense (feux de départ)
└─ shadow-glow-green Vert LED (succès)

Typographie:
├─ Sans-serif bold Titres sportifs
├─ System-ui fallback Compatibilité maximale
└─ Font smoothing Anti-aliasing GPU

Responsive:
├─ Mobile (375px) Grille 1 colonne
├─ Tablet (768px) Grille 2 colonnes
└─ Desktop (1920px+) Full-width optimisé

Composants:
├─ .btn-f1 Bouton F1 (base)
├─ .btn-primary Bouton rouge (action primaire)
├─ .btn-secondary Bouton gris (action secondaire)
└─ .light-blink LED animation (feux)

═══════════════════════════════════════════════════════════════════════════════════

💾 PERSISTANCE (LocalStorage)

High Scores:
├─ 'f1_high_score'
│ ├─ Valeur: String numérique (ex: "145.325")
│ ├─ Reaction Game minimum (< 200ms = excellent)
│ └─ Format: Millisecondes avec 3 décimales
│
└─ 'f1_tyre_high_score'
├─ Valeur: String numérique (ex: "2450")
├─ Tyre Manager maximum (plus élevé = mieux)
└─ Format: Points entiers

Accès en Console:
localStorage.getItem('f1_high_score') // Reaction score
localStorage.getItem('f1_tyre_high_score') // Tyre score
localStorage.clear() // Réinitialiser tout

═══════════════════════════════════════════════════════════════════════════════════

🧪 TESTING & VALIDATION

Voir: test-validation.js

Checklist (29 tests):
├─ Audio System (5) Initiation, sons, fréquences
├─ Timing System (3) Précision, calculs, délais
├─ Reaction Game (5) UI, séquence, résultats
├─ Tyre Game (5) UI, thermique, scoring
├─ Storage (3) Save/load, persistance
├─ Performance (4) Temps chargement, FPS, mémoire
└─ Responsive (4) Mobile, tablet, desktop, touch

Commandes Debug:
performance.now() // Temps haute précision
new AudioContext() // Vérifier audio
localStorage // Tous les scores
console.time('name') // Profiler code

═══════════════════════════════════════════════════════════════════════════════════

📚 DOCUMENTATION COMPLÈTE

1. README.md (LIRE EN PREMIER)
   └─ Installation, fonctionnalités, overview complet

2. QUICKSTART.md
   └─ Commandes npm, troubleshooting, FAQ

3. ARCHITECTURE.md
   └─ Data flows, component tree, layer architecture

4. game-rules.js
   └─ Règles précises, scoring, achievements

5. test-validation.js
   └─ Checklist tests, debug commands

6. constants.js
   └─ Configuration globale

═══════════════════════════════════════════════════════════════════════════════════

🔗 FICHIERS CLÉS & RÔLES

Composants (JSX):
├─ App.jsx 🏠 Navigation principale
├─ ReactionGame.jsx ⚡ Jeu réaction FIA
└─ TyreGame.jsx 🔥 Jeu gestion pneus

Hooks (JS):
├─ useReactionTimer.js ⏱️ Chronomètre 0.001ms
└─ useF1Audio.js 🔊 Synthèse sonore

Config/Const (JS):
├─ constants.js ⚙️ Variables globales
├─ game-rules.js 📋 Règles & scoring
└─ test-validation.js 🧪 Tests & debug

Styles:
├─ index.css 🎨 CSS global
├─ tailwind.config.js 🎭 Thème Tailwind
└─ postcss.config.cjs ⚙️ PostCSS

Config:
├─ package.json 📦 Dépendances
├─ vite.config.js 🚀 Bundler
├─ .env.example 🔐 Env vars
└─ .gitignore 📝 Git exclusions

HTML/Entry:
├─ index.html 📄 Page HTML
└─ main.jsx 🔌 React mount

═══════════════════════════════════════════════════════════════════════════════════

⚡ PERFORMANCE METRICS

Cible:
├─ FCP (First Contentful Paint) < 1s
├─ TTI (Time to Interactive) < 3s
├─ FPS (Frames Per Second) 60fps constant
├─ Memory usage < 50MB
├─ JS Bundle (gzipped) ~80KB
└─ Lighthouse Score > 90

═══════════════════════════════════════════════════════════════════════════════════

✨ NEXT STEPS

1. npm install # Installer les dépendances
2. npm run dev # Lancer le serveur
3. Tester les deux jeux
4. Vérifier les records (localStorage)
5. npm run build # Build production
6. Déployer sur Vercel/Netlify

═══════════════════════════════════════════════════════════════════════════════════

📞 SUPPORT & RESOURCES

Audio API:
├─ MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
└─ Specs: https://www.w3.org/TR/webaudio/

React:
├─ Docs: https://react.dev
├─ Hooks: https://react.dev/reference/react/hooks
└─ Performance: https://react.dev/reference/react#performance

Tailwind CSS:
├─ Docs: https://tailwindcss.com
└─ Config: https://tailwindcss.com/docs/configuration

Vite:
├─ Docs: https://vitejs.dev
└─ Perf: https://vitejs.dev/guide/ssr.html#performance-considerations

═══════════════════════════════════════════════════════════════════════════════════

🏆 FAIT AVEC ❤️ POUR LES FANS F1

Made with React, Vite, Tailwind CSS, and Web Audio API

Envoyé le: 2026-05-25
Version: 1.0.0

═══════════════════════════════════════════════════════════════════════════════════
