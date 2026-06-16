import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, ArrowLeft } from 'lucide-react';
import { useReactionTimer } from '../hooks/useReactionTimer.js';
import { useF1Audio } from '../hooks/useF1Audio.js';

const F1_AVERAGE = 200;

const ReactionGame = ({ onBack }) => {
  const [lights, setLights] = useState([false, false, false, false, false]);
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState(null);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('f1_high_score');
    return saved ? parseFloat(saved) : Infinity;
  });

  const { reactionTime, isActive, jumpStartDetected, startTimer, activateClick, recordReaction, reset } = useReactionTimer();
  const { playRedLight, playExtinction, playError, playSuccess } = useF1Audio();

  const handleStartGame = () => {
    reset();
    setResult(null);
    setGameStarted(true);

    const newLights = [false, false, false, false, false];
    const sequence = async () => {
      for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        newLights[i] = true;
        setLights([...newLights]);
        playRedLight();
      }

      const extinctionDelay = 1000 + Math.random() * 3000;
      await new Promise(resolve => setTimeout(resolve, extinctionDelay));

      setLights([false, false, false, false, false]);
      playExtinction();
      activateClick();
    };

    sequence();
    startTimer();
  };

  const handleClickReaction = () => {
    if (!gameStarted || !isActive) return;
    recordReaction();
  };

  useEffect(() => {
    if (jumpStartDetected) {
      playError();
      setResult({ type: 'jumpstart', message: 'FAUX DEPART (Jump Start)!' });
    }
  }, [jumpStartDetected]);

  useEffect(() => {
    if (reactionTime !== null && !jumpStartDetected) {
      const isNewRecord = reactionTime < highScore;

      if (isNewRecord) {
        localStorage.setItem('f1_high_score', reactionTime.toString());
        setHighScore(reactionTime);
        playSuccess();
      } else {
        playExtinction();
      }

      const comparison = reactionTime < F1_AVERAGE ? 'EXCELLENT' : 'BON';
      setResult({ type: 'success', time: reactionTime.toFixed(0), comparison, isNewRecord });
    }
  }, [reactionTime, jumpStartDetected]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-f1-dark to-gray-900 p-6">
      {onBack && (
        <button onClick={onBack} className="self-start mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Retour
        </button>
      )}

      <h1 className="text-5xl font-bold mb-2 text-f1-red tracking-wide">F1 REACTION</h1>
      <p className="text-gray-400 mb-12 text-center">Appuyez quand les feux s'eteignent</p>

      <div className="flex gap-6 mb-12">
        {lights.map((isLit, i) => (
          <div
            key={i}
            className={`light-blink ${isLit ? 'bg-f1-red shadow-glow' : 'bg-gray-800'}`}
          />
        ))}
      </div>

      <button
        onClick={handleClickReaction}
        disabled={!isActive}
        className={`w-32 h-32 rounded-full font-bold text-xl transition-all duration-100 transform ${
          isActive
            ? 'bg-f1-yellow text-black hover:scale-105 active:scale-95 cursor-pointer'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {gameStarted ? (isActive ? 'GO!' : 'PRET') : 'ATTENDRE'}
      </button>

      {result && (
        <div className="mt-12 text-center bg-gray-800/50 rounded-lg p-8 max-w-md">
          <p className="text-2xl font-bold mb-4">
            {result.type === 'jumpstart' ? result.message : `${result.time} ms`}
          </p>
          {result.type === 'success' && (
            <>
              <p className={`text-xl font-semibold mb-2 ${result.comparison === 'EXCELLENT' ? 'text-f1-green' : 'text-yellow-400'}`}>
                {result.comparison} (Moyenne F1: {F1_AVERAGE}ms)
              </p>
              {result.isNewRecord && <p className="text-f1-green font-bold">NOUVEAU RECORD!</p>}
            </>
          )}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-2">MEILLEUR TEMPS</p>
        <p className="text-3xl font-bold text-f1-green">
          {highScore === Infinity ? '--' : highScore.toFixed(0)} ms
        </p>
      </div>

      <div className="flex gap-4 mt-12">
        <button onClick={handleStartGame} className="btn-primary flex items-center gap-2">
          <Play size={20} /> Jouer
        </button>
        <button onClick={() => { reset(); setResult(null); setGameStarted(false); setLights([false,false,false,false,false]); }} className="btn-secondary flex items-center gap-2">
          <RotateCcw size={20} /> Reinitialiser
        </button>
      </div>
    </div>
  );
};

export default ReactionGame;
