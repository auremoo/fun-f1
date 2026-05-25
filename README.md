# 🏎️ F1 ARCADE - Jeu de Réaction Haute Performance

Une application web React interactive simulant les défis du paddock F1 avec une **précision au millième de seconde** et une gestion audio sans latence.

## 🎯 Caractéristiques Principales

### Jeu de Réaction (Reaction Game)

- **5 feux rouges** FIA s'allumant séquentiellement
- Extinction aléatoire (1-4 secondes après)
- **Détection de faux départ** (Jump Start)
- Comparaison avec la moyenne F1 (**200ms**)
- Sauvegarde des meilleurs temps en LocalStorage
- Précision: **0.001 ms** (performance.now())

### Gestionnaire de Pneus (Tyre Manager)

- Simulation thermique réaliste des pneus
- Zone optimale: 80-105°C
- Difficulté progressive avec 4 niveaux
- Scoring en temps réel
- Meilleur score sauvegardé

## 🛠️ Stack Technique

```json
{
  "frontend": "React 18.2",
  "bundler": "Vite 5.0",
  "styling": "Tailwind CSS 3.3",
  "icons": "Lucide React",
  "audio": "Web Audio API (Synthèse Sonore)",
  "timing": "performance.now()",
  "storage": "LocalStorage"
}
```

## 📁 Structure du Projet

```
fun-f1/
├── src/
│   ├── hooks/
│   │   ├── useReactionTimer.js    # Logique chronomètre haute précision
│   │   └── useF1Audio.js          # Synthèse sonore Web Audio API
│   ├── components/
│   │   ├── ReactionGame.jsx       # Composant jeu réaction
│   │   ├── TyreGame.jsx           # Composant jeu pneus
│   │   └── App.jsx                # Navigation & Dashboard
│   ├── main.jsx                   # Entry point React
│   └── index.css                  # Styles Tailwind + custom
├── vite.config.js
├── tailwind.config.js
├── postcss.config.cjs
└── index.html
```

## 🎨 Design System

### Palette de Couleurs

- **Dark Mode**: `#0b0b0b` (Fond principal)
- **F1 Red**: `#e10600` (Accent primaire)
- **FIA Green**: `#22c55e` (Validation/succès)
- **Pirelli Yellow**: `#ffcc00` (Alerte/attention)

### Effets Visuels

- **Glow Shadow** sur les feux: `shadow-glow`
- **Animations Tailwind** fluides (200ms)
- **Transform** au survol: scale-105
- **Typographie sportive**: Sans-serif bold/italic

## 🚀 Installation & Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Build pour la production
npm run build

# 4. Aperçu du build
npm run preview
```

## 📊 Hooks Personnalisés

### `useReactionTimer()`

Gestion du chronomètre haute précision:

- `reactionTime`: Temps de réaction mesuré (ms)
- `jumpStartDetected`: Détection de faux départ
- `canClick`: Indication si le joueur peut cliquer
- `startTimer()`: Lance la séquence
- `recordReaction()`: Enregistre le temps
- `reset()`: Réinitialise l'état

### `useF1Audio()`

Synthèse sonore sans latence fichier:

- `playRedLight()`: Bip 760Hz (200ms)
- `playExtinction()`: Son 1200Hz (150ms)
- `playError()`: Alerte 300Hz (400ms)
- `playSuccess()`: Succès 1600Hz (250ms)

## 💾 Persistance des Données

Les meilleurs scores sont sauvegardés dans le LocalStorage:

- **Clé pour Reaction**: `f1_high_score`
- **Clé pour Tyre Manager**: `f1_tyre_high_score`

```javascript
// Accéder aux records
const reactionBest = localStorage.getItem("f1_high_score");
const tyreBest = localStorage.getItem("f1_tyre_high_score");
```

## ⚡ Performance

- ✅ `performance.now()` pour chronomètres au 0.001ms
- ✅ Web Audio API (synthèse sans latence fichier)
- ✅ Animations GPU-accelerated avec Tailwind
- ✅ Code-splitting automatique avec Vite
- ✅ Minimal JS bundle: ~80KB gzippé

## 🎮 Règles du Jeu

### Reaction Game

1. Les 5 feux s'allument à 1 seconde d'intervalle
2. Attendre l'extinction aléatoire (1-4s après le dernier)
3. Cliquer **GO!** dès que les feux s'éteignent
4. ✓ < 200ms = **EXCELLENT** (moyenne F1)
5. ✓ ≥ 200ms = **BON**
6. ✗ Clic avant extinction = **JUMP START**

### Tyre Manager

1. Les pneus montent progressivement en température
2. Cliquer sur les pneus pour les refroidir (-15°C)
3. Zone optimale: 80-105°C (+10 points)
4. Zone danger: > 115°C = GAME OVER
5. La difficulté augmente tous les 30 secondes

## 📝 Notes Techniques

### Synthèse Sonore (Web Audio API)

Les bips sont générés directement sans fichiers MP3 pour éviter la latence:

```javascript
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.frequency.value = 760; // Hertz
osc.type = "sine";
gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
```

### Timing Haute Précision

`performance.now()` offre une précision en microsecondes (0.001ms):

```javascript
const startTime = performance.now();
// ... action utilisateur ...
const reactionTime = performance.now() - startTime;
```

## 🐛 Debugging

```bash
# Vérifier les perfs du navigateur
# DevTools → Performance → Enregistrer & analyser

# Vérifier la synthèse audio
# DevTools → Console → audioContext.getOutputTimestamp()

# Nettoyer le LocalStorage
localStorage.clear()
```

## 📱 Responsive Design

- ✅ Mobile-first
- ✅ Tablette optimisée
- ✅ Desktop full-width
- ✅ Touch & click événements

## 🔮 Améliorations Futures

- [ ] Leaderboard en ligne
- [ ] Modes multijoueur
- [ ] Calibration des gains audio
- [ ] Statistiques détaillées
- [ ] Themes personnalisés
- [ ] Mode dark/light toggle

## 📄 Licence

MIT - F1 Arcade © 2024

---

**Made with ❤️ for F1 fans** 🏁
