import React, { useState, useEffect } from 'react';
import { Flame, RotateCcw } from 'lucide-react';

/**
 * Composant TyreGame : Mini-jeu de gestion de température des pneus
 */
const TyreGame = () => {
  const [temperatures, setTemperatures] = useState([85, 85, 85, 85]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [gameLevel, setGameLevel] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('f1_tyre_high_score');
    return saved ? parseInt(saved) : 0;
  });

  // Intervalle de jeu (rafraîchissement toutes les 500ms)
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setGameTime(t => t + 0.5);

      setTemperatures(prev => {
        return prev.map(temp => {
          // Augmentation progressive basée sur le niveau
          const increase = 0.5 + gameLevel * 0.3 + (Math.random() * 0.5);
          let newTemp = temp + increase;

          // Perte de chaleur lente
          newTemp = Math.max(newTemp, 40);
          return Math.min(newTemp, 120);
        });
      });

      // Incrémenter le score (bonus pour maintien en zone verte)
      setScore(prev => {
        const tempAvg = temperatures.reduce((a, b) => a + b) / 4;
        const inGreenZone = tempAvg >= 80 && tempAvg <= 105;
        return prev + (inGreenZone ? 10 : 2);
      });
    }, 500);

    return () => clearInterval(interval);
  }, [gameActive, gameLevel]);

  // Contrôle des pneus au clic
  const handleCoolTyre = (index) => {
    setTemperatures(prev => {
      const updated = [...prev];
      updated[index] = Math.max(updated[index] - 15, 40);
      return updated;
    });
  };

  // Augmentation de difficulté toutes les 30 secondes
  useEffect(() => {
    if (gameTime > 0 && gameTime % 30 === 0) {
      setGameLevel(prev => prev + 1);
    }
  }, [gameTime]);

  // Fin du jeu si un pneu surchauffe
  useEffect(() => {
    if (temperatures.some(temp => temp >= 120)) {
      setGameActive(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('f1_tyre_high_score', score.toString());
      }
    }
  }, [temperatures, score, highScore]);

  const startGame = () => {
    setTemperatures([85, 85, 85, 85]);
    setScore(0);
    setGameTime(0);
    setGameLevel(1);
    setGameActive(true);
  };

  const getTyreColor = (temp) => {
    if (temp < 60) return 'bg-blue-600';
    if (temp < 80) return 'bg-yellow-500';
    if (temp < 105) return 'bg-green-500';
    if (temp < 115) return 'bg-orange-500';
    return 'bg-f1-red';
  };

  const getTyreName = (index) => {
    const names = ['FL', 'FR', 'RL', 'RR'];
    return names[index];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-f1-dark p-6">
      <h1 className="text-5xl font-bold mb-2 text-f1-yellow tracking-wide">TYRE MANAGER</h1>
      <p className="text-gray-400 mb-12 text-center">Maintenez les pneus entre 80°C et 105°C</p>

      {/* Affichage du score et temps */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <p className="text-gray-400 text-sm">TEMPS</p>
          <p className="text-3xl font-bold text-f1-green">{gameTime.toFixed(1)}s</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">SCORE</p>
          <p className="text-3xl font-bold text-f1-yellow">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">NIVEAU</p>
          <p className="text-3xl font-bold text-f1-red">{gameLevel}</p>
        </div>
      </div>

      {/* Grille de pneus */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        {temperatures.map((temp, i) => (
          <button
            key={i}
            onClick={() => handleCoolTyre(i)}
            disabled={!gameActive}
            className={`flex flex-col items-center justify-center w-24 h-24 rounded-lg transition-all ${getTyreColor(temp)} ${
              gameActive ? 'cursor-pointer hover:scale-105' : 'opacity-50'
            }`}
          >
            <Flame size={24} className="mb-2" />
            <p className="font-bold text-lg">{getTyreName(i)}</p>
            <p className="text-sm font-semibold">{Math.round(temp)}°C</p>
          </button>
        ))}
      </div>

      {/* Indicateur de zone saine */}
      <div className="mb-12 flex items-center gap-4 bg-gray-800/50 px-6 py-3 rounded-lg">
        <div className="w-4 h-4 bg-green-500 rounded"></div>
        <p className="text-sm">Zone optimale: 80-105°C</p>
      </div>

      {/* Meilleur score */}
      <div className="text-center mb-8">
        <p className="text-gray-400 mb-2">MEILLEUR SCORE</p>
        <p className="text-3xl font-bold text-f1-yellow">{highScore}</p>
      </div>

      {/* Résultat si game over */}
      {!gameActive && gameTime > 0 && (
        <div className="mb-8 text-center bg-red-900/30 border border-f1-red rounded-lg p-6">
          <p className="text-2xl font-bold text-f1-red">GAME OVER</p>
          <p className="text-gray-300 mt-2">Un pneu a surchauffé!</p>
        </div>
      )}

      {/* Boutons de contrôle */}
      <div className="flex gap-4">
        <button
          onClick={startGame}
          disabled={gameActive}
          className="btn-primary flex items-center gap-2"
        >
          ▶ {gameActive ? 'EN COURS' : 'DÉMARRER'}
        </button>
        <button
          onClick={() => {
            setGameActive(false);
            setTemperatures([85, 85, 85, 85]);
            setScore(0);
            setGameTime(0);
            setGameLevel(1);
          }}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw size={20} /> Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default TyreGame;
