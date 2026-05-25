# F1 ARCADE - Commandes Rapides

## 🚀 Démarrage

### Windows

```cmd
setup.bat
```

### Mac/Linux

```bash
bash setup.sh
```

### Manuel

```bash
npm install        # Installation dépendances (une seule fois)
npm run dev        # Démarrage serveur local
npm run build      # Build production
npm run preview    # Aperçu du build
```

## 📱 Accès à l'application

Après `npm run dev`, ouvrir:

- **Local**: http://localhost:5173
- **Network**: [URL affichée dans le terminal]

## 🎮 Jeux Disponibles

### 1️⃣ Reaction Game

- **Objectif**: Temps de réaction au feu vert
- **Précision**: 0.001ms
- **Score F1**: 200ms
- **Storage**: `f1_high_score`

### 2️⃣ Tyre Manager

- **Objectif**: Gérer température pneus (80-105°C)
- **Difficulté**: Progressive
- **Game Over**: > 120°C
- **Storage**: `f1_tyre_high_score`

## 📊 LocalStorage

### Records Personnels

```javascript
// Lire les records
const reactionBest = localStorage.getItem("f1_high_score"); // ms
const tyreBest = localStorage.getItem("f1_tyre_high_score"); // points

// Réinitialiser
localStorage.removeItem("f1_high_score");
localStorage.removeItem("f1_tyre_high_score");
localStorage.clear(); // Tout
```

## 🔊 Audio API

Web Audio API (synthèse sine wave):

- **Red Light**: 760Hz × 200ms
- **Extinction**: 1200Hz × 150ms
- **Error**: 300Hz × 400ms
- **Success**: 1600Hz × 250ms

## 📁 Structure de Fichiers

```
fun-f1/
├── App.jsx                    # Navigation
├── ReactionGame.jsx           # Jeu réaction
├── TyreGame.jsx               # Jeu pneus
├── useReactionTimer.js        # Hook timer
├── useF1Audio.js              # Hook audio
├── constants.js               # Constantes
├── index.html                 # Page principale
├── main.jsx                   # Entry React
├── index.css                  # Styles
├── package.json               # Dépendances
└── vite.config.js             # Config Vite
```

## 🎨 Design

- **Thème**: Dark Mode (#0b0b0b)
- **Accents**:
  - F1 Red: #e10600
  - FIA Green: #22c55e
  - Pirelli Yellow: #ffcc00
- **Responsive**: Mobile → Desktop

## ⚡ Performance

- Vue du DevTools Performance: ~45ms FCP
- Lighthouse Score: ~95+
- Bundle size: ~80KB gzippé

## 🐛 Debugging

```javascript
// DevTools Console
performance.now(); // Chrono haute précision
audioContext.state; // État audio
localStorage; // Afficher tous les records

// Performance Monitoring
console.time("reaction");
// code...
console.timeEnd("reaction");
```

## 🚨 Troubleshooting

### Audio ne fonctionne pas

- Vérifier le volume du navigateur
- Vérifier que AudioContext est créé (click d'abord)
- Console: `new AudioContext()` puis permettre accès

### Performances lentes

- Vérifier GPU (DevTools → Performance)
- Désactiver extensions du navigateur
- Vérifier RAM libre

### LocalStorage vide

- Navigateur en mode privé? → LocalStorage disabled
- Clear cookies → localStorage.clear()

## 📚 Documentation

Voir **README.md** pour:

- Architecture détaillée
- Installation complète
- Hooks expliqués
- Stack technique

---

**Happy Racing! 🏁**
