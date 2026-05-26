import React, { useState } from 'react';
import { Zap, Gauge, Home } from 'lucide-react';
import ReactionGame from './ReactionGame.jsx';
import TyreGame from './TyreGame.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [reactionHighScore, setReactionHighScore] = useState(() => {
    const saved = localStorage.getItem('f1_high_score');
    return saved ? parseFloat(saved) : null;
  });

  return (
    <div className="min-h-screen bg-f1-dark text-white">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-f1-red/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/fun-f1/fun_f1.png" alt="F1 Arcade" className="h-10 w-auto" />
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                currentPage === 'home'
                  ? 'bg-f1-red text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Home size={18} /> Accueil
            </button>
          </nav>
        </div>
      </header>

      <main>
        {currentPage === 'home' && (
          <div className="min-h-screen bg-gradient-to-b from-f1-dark to-gray-900 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-4">
                <span className="text-f1-red">F1</span>{' '}
                <span className="text-f1-green">ARCADE</span>
              </h1>
              <p className="text-gray-400 text-xl">
                Testez vos réflexes contre les meilleures performances F1
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mb-16">
              <div
                onClick={() => setCurrentPage('reaction')}
                className="group cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-f1-red/30 hover:border-f1-red transition-all hover:shadow-glow transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-lg bg-f1-red/20 group-hover:bg-f1-red/40 transition-all">
                  <Zap size={32} className="text-f1-red" />
                </div>
                <h2 className="text-2xl font-bold mb-3">REACTION</h2>
                <p className="text-gray-400 mb-4">
                  Mesurez votre temps de réaction face aux feux de départ FIA.
                  Battez la moyenne de 200ms des pilotes F1!
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Précision: 0.001ms</span>
                  {reactionHighScore && (
                    <span className="text-f1-green font-bold">
                      PB: {reactionHighScore.toFixed(0)}ms
                    </span>
                  )}
                </div>
              </div>

              <div
                onClick={() => setCurrentPage('tyre')}
                className="group cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-f1-yellow/30 hover:border-f1-yellow transition-all hover:shadow-glow transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-lg bg-f1-yellow/20 group-hover:bg-f1-yellow/40 transition-all">
                  <Gauge size={32} className="text-f1-yellow" />
                </div>
                <h2 className="text-2xl font-bold mb-3">TYRE MANAGER</h2>
                <p className="text-gray-400 mb-4">
                  Gérez la température de vos pneus. Maintenez-les dans la zone
                  optimale pour maximiser votre score!
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Difficulté: Progressive</span>
                  <span className="text-f1-yellow font-bold">Défi</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-3 gap-4 bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">JEUX DISPONIBLES</p>
                <p className="text-3xl font-bold text-f1-red">2</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">TECHNOLOGIE</p>
                <p className="text-lg font-bold text-f1-green">Web Audio API</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">PRECISION</p>
                <p className="text-lg font-bold text-f1-yellow">0.001ms</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'reaction' && <ReactionGame onBack={() => setCurrentPage('home')} />}
        {currentPage === 'tyre' && <TyreGame onBack={() => setCurrentPage('home')} />}
      </main>

      <footer className="border-t border-gray-700 py-6 px-4 text-center text-gray-500 text-sm">
        <p>F1 ARCADE © 2024 | Performance & Précision au Service du Racing</p>
      </footer>
    </div>
  );
};

export default App;
