# F1 ARCADE

Application web React avec deux mini-jeux F1 : test de temps de réaction et gestion de température des pneus.

**Demo** : https://auremoo.github.io/fun-f1/

## Jeux

**Reaction Game** — 5 feux rouges FIA s'allument séquentiellement, puis s'éteignent après un délai aléatoire (1-4s). Cliquer GO! le plus vite possible. Détection de faux départ (jump start). Précision : 0.001ms via `performance.now()`.

**Tyre Manager** — Gérez la température de 4 pneus en temps réel. Zone optimale : 80-105°C. Cliquer sur un pneu pour le refroidir (-15°C). La difficulté augmente par paliers de 30s. Game over si un pneu atteint 120°C.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Web Audio API (sons synthétisés, zéro latence)
- LocalStorage (meilleurs scores persistants)

## Structure

```
src/
├── components/
│   ├── App.jsx            # Navigation & accueil
│   ├── ReactionGame.jsx   # Jeu de réaction
│   └── TyreGame.jsx       # Gestionnaire de pneus
├── hooks/
│   ├── useReactionTimer.js  # Chronomètre haute précision
│   └── useF1Audio.js        # Synthèse sonore Web Audio
├── utils/
│   └── constants.js       # Constantes globales
├── styles/
│   └── index.css          # Tailwind + composants custom
└── main.jsx               # Entry point
```

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Build production → dist/
npm run preview  # Aperçu du build
```

## Déploiement

Le déploiement sur GitHub Pages est automatique au push sur `main` via `.github/workflows/deploy.yml`.

Pour activer GitHub Pages : Settings → Pages → Source → **GitHub Actions**.

## Thème

| Couleur | Hex | Usage |
|---------|-----|-------|
| Dark | `#0b0b0b` | Fond |
| F1 Red | `#e10600` | Accent primaire |
| Green | `#22c55e` | Succès / zone optimale |
| Yellow | `#ffcc00` | Avertissement / pneus |

## Licence

MIT
