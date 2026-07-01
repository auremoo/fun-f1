import React, { useState } from 'react';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import { getDataSafeConfig, setDataSafeConfig, exportData } from '../utils/dataSafe.js';

const Settings = ({ onBack }) => {
  const [config, setConfig] = useState(getDataSafeConfig());
  const [status, setStatus] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleChange = (field) => (e) => {
    setConfig((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveConfig = () => {
    setDataSafeConfig(config);
    setStatus({ type: 'success', message: 'Configuration DataSafe enregistrée.' });
  };

  const handleExport = async () => {
    setIsExporting(true);
    setStatus(null);

    const result = await exportData();
    setIsExporting(false);

    if (result.mode === 'datasafe') {
      setStatus({
        type: 'success',
        message: `Sauvegarde envoyée vers DataSafe (version ${result.result?.versions ?? '?'}).`,
      });
    } else if (result.mode === 'local-fallback') {
      setStatus({
        type: 'warning',
        message: 'Envoi vers DataSafe impossible, fichier téléchargé en local à la place.',
      });
    } else {
      setStatus({ type: 'success', message: 'Fichier de sauvegarde téléchargé.' });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-f1-dark to-gray-900 p-6">
      {onBack && (
        <button onClick={onBack} className="self-start mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Retour
        </button>
      )}

      <h1 className="text-4xl font-bold mb-8 text-f1-red tracking-wide">REGLAGES</h1>

      <div className="w-full max-w-lg bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
        <h2 className="text-xl font-bold mb-1">DataSafe</h2>
        <p className="text-gray-400 text-sm mb-6">
          Optionnel. Renseigne ces champs pour sauvegarder tes scores sur ton compte DataSafe (écosystème PRP).
          Laisse-les vides pour télécharger un fichier de sauvegarde en local à la place.
        </p>

        <label className="block text-sm text-gray-400 mb-1">URL DataSafe</label>
        <input
          type="text"
          value={config.url}
          onChange={handleChange('url')}
          placeholder="https://mon-domaine-prp/api/data-safe/ingest"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-f1-red"
        />

        <label className="block text-sm text-gray-400 mb-1">Clé API</label>
        <input
          type="password"
          value={config.apiKey}
          onChange={handleChange('apiKey')}
          placeholder="Depuis DataSafe > Paramètres dans PRP"
          className="w-full mb-4 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-f1-red"
        />

        <label className="block text-sm text-gray-400 mb-1">Nom de l'app</label>
        <input
          type="text"
          value={config.appName}
          onChange={handleChange('appName')}
          placeholder="ex: f1-arcade"
          className="w-full mb-6 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-f1-red"
        />

        <button onClick={handleSaveConfig} className="btn-secondary flex items-center gap-2">
          <Save size={18} /> Enregistrer la configuration
        </button>
      </div>

      <button onClick={handleExport} disabled={isExporting} className="btn-primary flex items-center gap-2">
        <UploadCloud size={20} /> {isExporting ? 'Sauvegarde en cours...' : 'Sauvegarder mes données'}
      </button>

      {status && (
        <p className={`mt-6 text-center ${status.type === 'warning' ? 'text-yellow-400' : 'text-f1-green'}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default Settings;
