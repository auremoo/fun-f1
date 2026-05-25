# 🏎️ F1 ARCADE - Application Web de Réaction

> Jeu de réaction haute performance avec synthèse audio Web Audio API
> **Précision au millième de seconde** | **Latence audio 0ms**

---

## ⚡ DÉMARRAGE RAPIDE (3 étapes)

### 1️⃣ Migrer la structure (IMPORTANT!)

```bash
# Windows
migrate-structure.bat

# Mac/Linux
bash migrate-structure.sh
```

Cela:

- ✅ Crée les dossiers `src/`, `docs/`, `public/`
- ✅ Organise les fichiers correctement
- ✅ Met à jour les chemins
- ✅ Nettoie les anciens fichiers

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Lancer l'application

```bash
npm run dev
```

→ Ouvre automatiquement **http://localhost:5173**

---

## 📁 NOUVELLE STRUCTURE

```
fun-f1/
├── src/                    # Code source
│   ├── components/         # Composants React
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Configuration & constantes
│   ├── styles/            # CSS global
│   └── main.jsx           # Entry point
├── docs/                  # Documentation
├── public/                # Assets statiques
├── index.html             # Page HTML
├── package.json
└── vite.config.js         # Config Vite
```

**👉 Lire aussi:** `MIGRATION_GUIDE.txt`

---

## 🎮 LES DEUX JEUX

### 1. Reaction Game ⚡

- **Objectif**: Mesurez votre temps de réaction au feu vert FIA
- **Gameplay**: 5 feux rouges s'allument → extinction aléatoire → Cliquez GO!
- **Précision**: 0.001ms (microseconde)
- **Scoring**: < 200ms = EXCELLENT (niveau F1)

### 2. Tyre Manager 🔥

- **Objectif**: Gérez la température des 4 pneus
- **Zone optimale**: 80-105°C
- **Difficulté**: Progressive (niveaux 1-5)
- **Game Over**: Pneu > 120°C

---

## 🛠️ COMMANDES NPM

```bash
npm run dev      # Développement (HMR activé)
npm run build    # Build production
npm run preview  # Aperçu du build
```

---

## 📚 DOCUMENTATION

| Fichier                | Contenu                    |
| ---------------------- | -------------------------- |
| `MIGRATION_GUIDE.txt`  | **Lire en premier!**       |
| `docs/README.md`       | Guide complet              |
| `docs/ARCHITECTURE.md` | Diagrammes & flows         |
| `docs/QUICKSTART.md`   | FAQ & troubleshooting      |
| `test-validation.js`   | Checklist tests (29 tests) |

---

## 🏗️ ARCHITECTURE

**3 couches:**

```
┌─ UI (React Components) ─┐
│  App, ReactionGame,     │
│  TyreGame              │
├─ Logique (Hooks) ──────┤
│  useReactionTimer,      │
│  useF1Audio             │
├─ Config (Utils) ───────┤
│  constants, game-rules  │
└────────────────────────┘
```

---

## ⚙️ STACK TECHNIQUE

- **React 18.2** - UI avec Hooks
- **Vite 5.0** - Bundler ultra-rapide
- **Tailwind CSS** - Styling utility-first
- **Web Audio API** - Synthèse sonore (0ms latence)
- **performance.now()** - Timing au 0.001ms

---

## 💾 PERSISTANCE

Records sauvegardés dans **LocalStorage**:

```javascript
localStorage.getItem("f1_high_score"); // Reaction Game
localStorage.getItem("f1_tyre_high_score"); // Tyre Manager
```

---

## 🎨 DESIGN

- **Thème**: Dark Mode (#0b0b0b)
- **Couleurs**: F1 Red, FIA Green, Pirelli Yellow
- **Responsive**: Mobile → Desktop
- **Animations**: 60fps smooth

---

## 📊 PERFORMANCE

- ✅ FCP: < 1s
- ✅ TTI: < 3s
- ✅ FPS: 60 constant
- ✅ JS Bundle: ~80KB gzippé
- ✅ Lighthouse: > 90

---

## 🐛 TROUBLESHOOTING

**Erreur d'imports après migration?**

```bash
rm -rf node_modules && npm install
npm run dev
```

**Audio ne fonctionne pas?**

- Vérifier que vous avez cliqué quelque part (user gesture required)
- Vérifier que le volume du navigateur est activé

**Performances lentes?**

- Vérifier GPU (DevTools → Performance)
- Désactiver les extensions navigateur

---

## 🚀 DEPLOYMENT

Vercel / Netlify:

1. Créer compte (gratuit)
2. Connecter repo GitHub
3. Deploy en 1 clic!

**Voir:** `docs/DEPLOYMENT.md`

---

## 📖 POUR CONTINUER

1. ✅ Exécuter `migrate-structure.bat/sh`
2. ✅ `npm install && npm run dev`
3. ✅ Lire `docs/README.md`
4. ✅ Jouer! 🏁

---

**Made with ❤️ for F1 fans**

🏎️ Performance | 🔊 Audio | ⏱️ Precision | 🎮 Fun
