#!/bin/bash

echo "🏎️ F1 ARCADE - Installation & Démarrage"
echo "========================================"
echo ""

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js"
    exit 1
fi

echo "✅ npm détecté"
echo ""

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées avec succès"
    echo ""
    echo "🚀 Lancement du serveur de développement..."
    echo "   → Ouverture automatique sur http://localhost:5173"
    echo ""
    npm run dev
else
    echo "❌ Erreur lors de l'installation. Vérifiez votre connexion internet."
    exit 1
fi
